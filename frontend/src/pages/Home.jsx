import React, { useState, useEffect } from "react";
import RotatingTextDemo from "../reactBitsEffect/RotatingTextDemo";
import Maintxt from "@/reactBitsEffect/Maintxt";
import Input from "@/components/Input";
import Sidebar from "@/components/Sidebar";
import Botmsg from "@/components/Botmsg";

const Home = () => {
  const [titleLoad, setTitleLoad] = useState(false);
  const [convStart, setConvStart] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleLoad(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex w-full h-[calc(100vh-8vh)] overflow-hidden flex-col relative overflow-y-hidden">
      {/* Sidebar - fixed width */}
      <div className="w-[200px] hidden md:block opacity-5">
        <Sidebar />
      </div>

      {/* Main content - fills remaining space */}
      {convStart ? (
        <div className="flex-1 md:w-[calc(100%-200px)] flex flex-col text-center mt-15 relative md:ml-[26vw] lg:ml-[20vw] xl:ml-[10vw]">
          <Maintxt />

          {/* Title */}
          <h1
            className={`mt-10 flex items-center justify-center gap-2 text-2xl font-exo md:text-[2rem] lg:text-[2.2rem] transition-all duration-700 ${
              titleLoad
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-5"
            }`}
          >
            Creative <RotatingTextDemo />
          </h1>
        </div>
      ) : (
        <>
          <div className="flex w-full md:w-[calc(100%-210px)] flex-col gap-5 mt-2 bg-amber-300 h-[75%] md:ml-[28vw] md:px-[5vw] lg:max-w-[60%] lg:ml-[32vw] lg:px-0 xl:max-w-[50%] break-all px-2">
            {/* Bot message (no background) */}
            <div className="self-start max-w-[100%]">
              <h1>BotMsg: Hello! How can I help you?</h1>
            </div>

            {/* User message (bubble with bg) */}
            <div className="self-end max-w-[70%] bg-amber-50 px-3 py-2 rounded-[10px]">
              <h1>UserMsg</h1>
            </div>
          </div>
        </>
      )}

      {/* Input */}
      <div
        className={`absolute w-full px-4 transition-all duration-700 delay-200 md:ml-[14vw] lg:ml-[12vw] xl:ml-[17.5vw] xl:w-[80%]  ${
          titleLoad ? "opacity-100" : "opacity-0 translate-y-5"
        } ${convStart ? " bottom-[28vh] md:bottom-[25vh] lg:bottom-[30vh]" : "bottom-[4vh] opacity-100 translate-y-5"}`}
      >
        <Input className="w-full" />
      </div>
    </div>
  );
};

export default Home;
