import preTitleShow from "@/utils/preTitle";
import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "remixicon/fonts/remixicon.css";
import { useDispatch } from "react-redux";
import { sendChatMessage } from "@/store/slice/ChatSlice/chatAction";
import Fileupload from "./Fileupload";
import { uploadFile } from "@/store/slice/ChatSlice/uploadFileAction";
import { messageSend } from "@/store/slice/ChatSlice/chatSlic";
import { useNavigate } from "react-router-dom";

const Input = ({ convStart, setConvStart }) => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [showComponent, setShowComponent] = useState(false);
  const [file, setFile] = useState(null);
  const textareaRef = useRef(null);
  const message = watch("message", "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title] = useState(preTitleShow());

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    const resize = () => {
      el.style.height = "auto";
      let maxHeight;
      const width = window.innerWidth;

      if (width < 768) maxHeight = window.innerHeight / 3;
      else if (width < 1024) maxHeight = window.innerHeight / 4;
      else maxHeight = window.innerHeight / 5;

      el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    };

    resize(); // initial resize
    el.addEventListener("input", resize);
    window.addEventListener("resize", resize);

    return () => {
      el.removeEventListener("input", resize);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // --- keep validation but extract ref so we can attach textareaRef as well ---
  const { ref: registerMessageRef, ...registerMessageProps } = register(
    "message",
    { required: false }
  );

  const makeId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const onSubmit = (data) => {
    const text = data.message?.trim();

    // allow sending file-only or text-only
    if (!text && !file) return;

    if (convStart) setConvStart(false);

    // If file exists, create combined message object and upload
    if (file) {
      const id = makeId();

      const fileInfo = {
        name: file.name,
        size: file.size,
        type: file.type,
      };

      // include preview URL for immediate UI
      const filePreview = URL.createObjectURL(file);

      const messageObj = {
        id,
        role: "user",
        type: "file",
        text: text || "", // may be empty
        file: filePreview, // preview URL (not the raw File)
        fileInfo,
      };

      // store user message immediately in chat
      dispatch(messageSend(messageObj));

      // prepare form and upload to server (uploadFile action will dispatch bot response)
      const formData = new FormData();
      formData.append("file", file, file.name);
      if (text) formData.append("prompt", text);

      // pass user message id so upload action can link bot reply to this message
      dispatch(uploadFile(formData, id));

      // clear local file
      setFile(null);
    } else if (text) {
      // text-only: reuse existing sendChatMessage (emits & stores)
      dispatch(sendChatMessage(text));
    }

    reset();
  };

  const componentVisible = () => {
    setShowComponent((prev) => !prev);
  };

  const goToVoice = () => {
    navigate("/voicemode");
  };

  return (
    <div className="flex flex-col gap-[4rem]">
      {/* Title */}
      <h1 className="font-semibold text-center text-[5vw] ms:text-xl xl:text-[1.5vw]">
        {convStart ? title : ""}
      </h1>

      {/* Form */}
      <form
        className="px-5 flex flex-col items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="border min-h-[2rem] px-2 py-2 rounded-[10px] flex flex-col-reverse sm:flex-col w-full max-w-full md:max-w-2/3 lg:max-w-1/2 bg-[#fff]">
          {/* Icons */}
          <div className="flex items-center justify-between w-full text-xl gap-3">
            <div className="flex gap-2 items-center">
              <i
                className="ri-add-line cursor-pointer"
                onClick={componentVisible}
              ></i>
              {showComponent && (
                <Fileupload file={file} setFile={setFile} promt={message} />
              )}
            </div>
            <div className="flex items-center justify-center gap-3">
              <i className="ri-mic-line" onClick={goToVoice}></i>

              <i
                className="ri-send-plane-fill cursor-pointer"
                onClick={() => handleSubmit(onSubmit)()}
              ></i>
            </div>
          </div>

          {/* Textarea */}
          <textarea
            {...registerMessageProps}
            ref={(el) => {
              // attach both react-hook-form ref and local textareaRef
              if (registerMessageRef) registerMessageRef(el);
              textareaRef.current = el;
            }}
            className="w-full h-auto resize-none overflow-y-auto outline-0 p-2"
            placeholder="Type something..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default Input;
