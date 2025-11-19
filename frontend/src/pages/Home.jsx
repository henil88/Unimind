import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import RotatingTextDemo from "../reactBitsEffect/RotatingTextDemo";
import Maintxt from "@/reactBitsEffect/Maintxt";
import Input from "@/components/Input";
import Sidebar from "@/components/Sidebar";
import Botmsg from "@/components/Botmsg"; // <--- added import to render markdown/charts
import FileUi from "@/components/FileUi";
import { initSocket } from "@/lib/socketInitilize";
import { listenChatEvent } from "@/store/slice/ChatSlice/chatAction";
import Typinganimation from "@/components/Typinganimation";

const Home = () => {
  const [titleLoad, setTitleLoad] = useState(false);
  const [convStart, setConvStart] = useState(true);

  const dispatch = useDispatch();
  const { messages } = useSelector((state) => state.chat);

  const chatContainerRef = useRef(null);

  // load animation
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

  // Auto-open chat if any messages arrive (ensures backend replies are visible)
  useEffect(() => {
    if (messages && messages.length > 0 && convStart) {
      setConvStart(false);
    }
  }, [messages, convStart]);

  useEffect(() => {
    if (chatContainerRef.current) {
      // keep default behavior; added bottom padding prevents the last item from being hidden
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

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
              titleLoad ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Creative <RotatingTextDemo />
          </h1>
        </div>
      ) : (
        <div
          ref={chatContainerRef}
          id="chatContainer"
          className="flex w-full md:w-[calc(100%-210px)] flex-col gap-5 mt-2 overflow-x-hidden overflow-y-auto scrollbar-hide h-[82%] md:ml-[28vw] md:px-[5vw] lg:max-w-[60%] lg:ml-[25vw] lg:px-0 xl:max-w-[50%] xl:ml-[14vw] break-words px-2 pb-40" /* pb-40 prevents last message being hidden by input */
        >
          {messages.map((msg, idx) => (
            <div key={msg.id || idx} className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "user" ? (
                <div className="self-end max-w-[70%] bg-amber-50 px-3 py-2 mb-2 rounded-[10px] break-words whitespace-pre-wrap">
                  {msg.type === "file" ? (
                    <div className="flex flex-col gap-2">
                      <FileUi file={msg.fileInfo ? { ...msg.fileInfo, preview: msg.file } : { name: "file", preview: msg.file }} />
                      {msg.text && <div className="text-sm break-words whitespace-pre-wrap mt-1">{msg.text}</div>}
                    </div>
                  ) : (
                    <div className="text-sm break-words whitespace-pre-wrap">{msg.text}</div>
                  )}
                </div>
              ) : (
                <div className="self-start w-full max-w-[85%] mb-2"> {/* CHANGED: allow bot bubble to expand wider so charts/code fit better */}
                  {msg.fileInfo ? (
                    <div className="flex flex-col gap-2">
                      <FileUi file={msg.fileInfo ? { ...msg.fileInfo, preview: msg.file } : { name: "file", preview: msg.file }} />
                      <Botmsg msg={msg.processedData ?? msg.text ?? msg} />
                    </div>
                  ) : (
                    <Botmsg msg={msg.text ?? msg} />
                  )}
                </div>
              )}
            </div>
          ))}

          {/* typing indicator heuristics: if last msg is user and no bot after */}
          {messages.length > 0 && messages[messages.length - 1].role === "user" && <Typinganimation />}
        </div>
      )}

      {/* Input */}
      <div
        className={`absolute w-full px-4 transition-all duration-700 delay-200 md:ml-[29vw] lg:ml-[23vw] xl:ml-[12vw] xl:w-[80%] ${
          titleLoad ? "opacity-100" : "opacity-0 translate-y-5"
        }`}
        style={{
          top: convStart ? "45vh" : "62vh",
        }}
      >
        <Input className="w-full" convStart={convStart} setConvStart={setConvStart} />
      </div>
    </div>
  );
};

export default Home;
