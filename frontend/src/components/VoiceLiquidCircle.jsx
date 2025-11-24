import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ---------------------------
   GLSL: smooth fbm noise + circular mask
   --------------------------- */
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Smooth value-noise + fbm adapted from common patterns (iq / webgl-noise style)
const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform float u_scale;
  uniform vec2 u_resolution;
  uniform vec3 u_colorA;
  uniform vec3 u_colorB;

  // Hash / value noise
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    // four corners
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    // smoothstep / quintic interpolation
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // fbm
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 6; i++) {
      v += a * noise(p);
      p = p * 2.0;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    // aspect-corrected coordinates centered at 0
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 uv = (vUv - 0.5) * aspect;

    float radius = length(uv);
    // Soft circular mask (keeps everything perfectly circular regardless of canvas size)
    float edge = 0.008; // softness
    float mask = smoothstep(0.5, 0.5 - edge, radius); // inside -> 1

    if (mask <= 0.001) discard; // fully outside

    // create animated, smooth noise in polar space to avoid square artifacts
    float angle = atan(uv.y, uv.x);
    vec2 p = vec2(angle * 0.5, radius * 1.6);

    // Time-varying offsets for gentle movement
    p += vec2(u_time * 0.08, -u_time * 0.04);

    // layered fbm for soft clouds
    float n = fbm(p * (1.2 + u_scale * 0.4));
    n += 0.35 * fbm(p * 3.0 + vec2(1.7, -2.3) + u_time * 0.12);
    n = clamp(n, 0.0, 1.0);

    // radial falloff to keep softness at edges and central glow
    float falloff = smoothstep(0.5, 0.25, radius); // stronger towards center
    float cloud = n * falloff;

    // subtle inner glow
    float inner = smoothstep(0.5, 0.0, radius) * (0.4 + 0.6 * n);

    // color mix (light-blue watercolor feel)
    vec3 color = mix(u_colorA, u_colorB, clamp(cloud + inner * 0.6, 0.0, 1.0));

    // final alpha respects mask and cloud density
    float alpha = mask * (0.6 + 0.5 * cloud);

    gl_FragColor = vec4(color, alpha);
  }
`;

/* ---------------------------
   Mesh component: renders circle geometry and updates uniforms/scale
   --------------------------- */
function FluidCircle({ analyserRef }) {
  const meshRef = useRef();
  const materialRef = useRef();
  const { size } = useThree(); // get viewport size to update resolution uniform

  // create material once
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      uniforms: {
        u_time: { value: 0 },
        u_scale: { value: 1.0 },
        u_resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
        u_colorA: { value: new THREE.Color("#e8fbff") },
        u_colorB: { value: new THREE.Color("#7ed0ff") },
      },
      // ensure correct blending with transparent background
      blending: THREE.NormalBlending,
      side: THREE.DoubleSide,
    });
  }, []);

  // smoothing for mic input
  const smoothRef = useRef(0.0);
  // read buffer
  const buffer = useMemo(() => new Uint8Array(1024), []);

  useFrame(({ clock }, delta) => {
    // update time
    if (material) material.uniforms.u_time.value = clock.getElapsedTime();

    // update resolution uniform with current canvas size to correct aspect
    if (material)
      material.uniforms.u_resolution.value.set(size.width, size.height);

    // read analyser and compute RMS amplitude
    const analyser = analyserRef.current;
    let rms = 0.0;
    if (analyser) {
      const len = Math.min(analyser.fftSize, buffer.length);
      analyser.getByteTimeDomainData(buffer);
      let sum = 0.0;
      for (let i = 0; i < len; i++) {
        const v = (buffer[i] - 128) / 128; // -1..1
        sum += v * v;
      }
      rms = Math.sqrt(sum / len);
      // clamp to reasonable range
      rms = Math.min(0.6, rms);
    }

    // exponential smoothing
    const alpha = 0.06;
    smoothRef.current = smoothRef.current * (1.0 - alpha) + rms * alpha;

    // compute uniform scale and lerp mesh scale for smoothness
    const targetScale = 1.0 + smoothRef.current * 0.9; // range: 1.0 .. ~1.9
    if (meshRef.current) {
      const cur = meshRef.current.scale.x;
      const lerped = cur + (targetScale - cur) * Math.min(0.18, delta * 8.0);
      meshRef.current.scale.set(lerped, lerped, lerped);
    }

    if (material)
      material.uniforms.u_scale.value = 1.0 + smoothRef.current * 0.6;

    // attach material ref once
    materialRef.current = material;
  });

  return (
    <mesh ref={meshRef}>
      {/* Circle geometry with many segments for smoothness */}
      <circleGeometry args={[1.0, 256]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

/* ---------------------------
   Main exported component
   - Tailwind wrapper enforces perfect square (aspect-square)
   - Canvas set to width/height:100% to avoid stretching
   --------------------------- */
export default function VoiceLiquidCircle() {
  const analyserRef = useRef(null);
  const audioCtxRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    async function initMic() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        if (!mounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        audioCtxRef.current = audioCtx;
        const src = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = 0.85;
        src.connect(analyser);
        analyserRef.current = analyser;
        if (audioCtx.state === "suspended") await audioCtx.resume();
      } catch (err) {
        // do not throw UI errors — fail gracefully
        console.warn(
          "VoiceLiquidCircle: microphone not available or permission denied.",
          err
        );
      }
    }

    initMic();

    return () => {
      mounted = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
        audioCtxRef.current = null;
      }
      analyserRef.current = null;
    };
  }, []);

  return (
    // Tailwind: square aspect, fixed 300px size, centered contents
    <div className="w-[500px] aspect-square flex items-center justify-center">
      <div className="w-full h-full">
        <Canvas
          gl={{ antialias: true, alpha: true }}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            background: "transparent",
          }}
          orthographic
          camera={{ zoom: 150, position: [0, 0, 10] }}
        >
          <ambientLight intensity={0.0} />
          <FluidCircle analyserRef={analyserRef} />
        </Canvas>
      </div>
    </div>
  );
}
