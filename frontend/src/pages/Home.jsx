import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import RotatingTextDemo from "../reactBitsEffect/RotatingTextDemo";
import Maintxt from "@/reactBitsEffect/Maintxt";
import Input from "@/components/Input";
import Sidebar from "@/components/Sidebar";
import Botmsg from "@/components/Botmsg";
import { initSocket } from "@/lib/socketInitilize";
import { listenChatEvent } from "@/store/slice/ChatSlice/chatAction";
import Typinganimation from "@/components/Typinganimation";

const Home = () => {
  const [titleLoad, setTitleLoad] = useState(false);
  const [convStart, setConvStart] = useState(true);

  const dispatch = useDispatch();
  const { botMessages, userMessages } = useSelector((state) => state.chat);

  const chatContainerRef = useRef(null);



  
  // 1️⃣ Load animation timer
  useEffect(() => {
    const timer = setTimeout(() => setTitleLoad(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    initSocket(import.meta.env.VITE_SOCKET_URL);

    dispatch(listenChatEvent());

    return () => {
      // disconnectSocket();
    };
  }, [dispatch]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [botMessages, userMessages]);

  return (
    <div className="flex w-full h-[calc(100vh-8vh)] overflow-hidden flex-col items-center relative overflow-y-hidden">
      {/* Sidebar */}
      <div className="w-[200px] hidden md:block opacity-5">
        <Sidebar />
      </div>

      {/* Main Content */}
      {convStart ? (
        <div className="flex-1 md:w-[calc(100%-200px)] flex flex-col text-center mt-15 relative md:ml-[26vw] lg:ml-[20vw] xl:ml-[10vw]">
          <Maintxt />
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
        <div
          ref={chatContainerRef}
          id="chatContainer"
          className="flex w-full md:w-[calc(100%-210px)] flex-col gap-5 mt-2 overflow-x-hidden overflow-y-auto scrollbar-hide h-[82%] md:ml-[28vw] md:px-[5vw] lg:max-w-[60%] lg:ml-[25vw] lg:px-0 xl:max-w-[50%] xl:ml-[14vw] break-all px-2"
        >
          {botMessages.map((botMsg, idx) => (
            <React.Fragment key={idx}>
              {userMessages[idx] && (
                <div className="self-end max-w-[70%] bg-amber-50 px-3 py-2 mb-2 rounded-[10px]">
                  <h1>{userMessages[idx].text || userMessages[idx]}</h1>
                </div>
              )}

              <div className="self-start w-full">
                  <Botmsg msg={botMsg} />
              </div>
            </React.Fragment>
          ))}
          {/* Only show extra user message if userMessages.length > botMessages.length
          and the last bot message index is less than userMessages.length - 1 */}
          {userMessages.length > botMessages.length && (
            <div className="self-end max-w-[70%] bg-amber-50 px-3 py-2 mb-2 rounded-[10px]">
              <h1>
                {userMessages[botMessages.length].text ||
                  userMessages[botMessages.length]}
              </h1>
            </div>
          )}
          {/* Typing indicator: show if user sent a message and bot hasn't replied yet */}
          {userMessages.length > botMessages.length && <Typinganimation />}
        </div>
      )}

      {/* Input */}
      <div
        className={`absolute w-full px-4 transition-all duration-700 delay-200 md:ml-[29vw] lg:ml-[23vw] xl:ml-[12vw] xl:w-[80%] ${
          titleLoad ? "opacity-100" : "opacity-0 translate-y-5"
        }`}
        style={{
          top: convStart ? "45vh" : "73vh",
        }}
      >
        <Input
          className="w-full"
          convStart={convStart}
          setConvStart={setConvStart}
        />
      </div>
    </div>
  );
};

export default Home;
