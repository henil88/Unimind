import preTitleShow from "@/utils/preTitle";
import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "remixicon/fonts/remixicon.css";

const Input = () => {
  const { register, handleSubmit, watch } = useForm();
  const textareaRef = useRef(null);
  const message = watch("message", "");

  const [title] = useState(preTitleShow());

  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";

      // Responsive maxHeight based on viewport width
      let maxHeight;
      const width = window.innerWidth;

      if (width < 768) {
        // mobile
        maxHeight = window.innerHeight / 3; // 50% viewport
      } else if (width < 1024) {
        // md
        maxHeight = window.innerHeight / 4; // 33% viewport
      } else {
        // lg / xl
        maxHeight = window.innerHeight / 5; // 25% viewport
      }

      el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    }
  }, [message]);

  const onSubmit = (data) => {
    console.log("Submitted:", data.message);
  };

  return (
    <div className="flex flex-col gap-[2rem]">
      <h1 className="font-semibold text-center text-[5vw] ms:text-xl xl:text-[1.5vw]">
        {title}
      </h1>
      <form
        className="px-5 flex flex-col items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className="
            border min-h-[2rem] px-2 py-2 rounded-[10px] 
            flex flex-col-reverse sm:flex-col 
            w-full max-w-full md:max-w-2/3 lg:max-w-1/2
            bg-[#fff]
          "
        >
          {/* Icons container (stays at bottom) */}
          <div className="flex items-center justify-between w-full text-xl gap-3">
            <i className="ri-add-line"></i>
            <div className="flex items-center justify-center gap-3">
              <i className="ri-mic-line"></i>
              <i className="ri-send-plane-fill"></i>
            </div>
          </div>

          {/* Textarea */}
          <textarea
            {...register("message")}
            ref={(el) => {
              register("message").ref(el);
              textareaRef.current = el;
            }}
            className="
              w-full h-auto resize-none overflow-y-auto outline-0 p-2
            "
            placeholder="Type something..."
          />
        </div>
      </form>
    </div>
  );
};

export default Input;
