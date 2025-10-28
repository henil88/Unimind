import preTitleShow from "@/utils/preTitle";
import React, { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "remixicon/fonts/remixicon.css";
import { useDispatch } from "react-redux";
import { sendChatMessage } from "@/store/slice/ChatSlice/chatAction";
import Fileupload from "./Fileupload";

const Input = ({ convStart, setConvStart }) => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [showComponent, setShowComponent] = useState(false);
  const textareaRef = useRef(null);
  const message = watch("message", "");
  const dispatch = useDispatch();

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

  const onSubmit = (data) => {
    const text = data.message?.trim();
    console.log(text);
    if (!text) return;

    if (convStart) setConvStart(false);

    // Dispatch message to Redux + socket
    dispatch(sendChatMessage(text));

    // Clear input
    reset();
  };

  const componentVisible = () => {
    setShowComponent((prev) => !prev);
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
            <div>
              <i className="ri-add-line cursor-pointer" onClick={componentVisible}></i>
              {showComponent && <Fileupload />}
            </div>
            <div className="flex items-center justify-center gap-3">
              <i className="ri-mic-line"></i>
              <i
                className="ri-send-plane-fill cursor-pointer"
                onClick={() => handleSubmit(onSubmit)()} // ✅ send on click
              ></i>
            </div>
          </div>

          {/* Textarea */}
          <textarea
            {...register("message")}
            ref={(el) => {
              register("message").ref(el); // react-hook-form
              textareaRef.current = el; // for auto-resize
            }}
            className="w-full h-auto resize-none overflow-y-auto outline-0 p-2"
            placeholder="Type something..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(onSubmit)(); // ✅ send on Enter
              }
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default Input;
