import React, { useState, useEffect } from "react";
import RotatingTextDemo from "../reactBitsEffect/RotatingTextDemo";
import Maintxt from "@/reactBitsEffect/Maintxt";
import Input from "@/components/Input";
import Sidebar from "@/components/Sidebar";
import Botmsg from "@/components/Botmsg";

const Home = () => {
  const [titleLoad, setTitleLoad] = useState(false);
  const [convStart, setConvStart] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTitleLoad(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex w-full h-[calc(100vh-8vh)] overflow-hidden flex-col items-center relative overflow-y-hidden">
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
          <div className="flex w-full md:w-[calc(100%-210px)] flex-col gap-5 mt-2 overflow-x-hidden overflow-y-auto scrollbar-hide h-[82%] md:ml-[28vw] md:px-[5vw] lg:max-w-[60%] lg:ml-[25vw] lg:px-0 xl:max-w-[50%] xl:ml-[14vw] break-all px-2">
            {/* Bot message (no background) */}
            <div className="self-start max-w-[90%] w-full ">
              <Botmsg
                msg={{
                  text: "Here is the sales data for the last week:",
                  charts: [
                    {
                      seriesName: "Sales",
                      data: [
                        { name: "Mon", value: 120 },
                        { name: "Tue", value: 150 },
                        { name: "Wed", value: 170 },
                        { name: "Thu", value: 140 },
                        { name: "Fri", value: 190 },
                        { name: "Sat", value: 220 },
                        { name: "Sun", value: 200 },
                      ],
                      meta: {
                        title: "Weekly Sales",
                        subtext: "Units sold per day",
                        stats: { Total: 1190, Average: 170 },
                        ranges: ["1W", "1M", "3M"],
                      },
                    },
                  ],
                }}
              />
            </div>

            {/* User message (bubble with bg) */}
            <div className="self-end max-w-[70%] bg-amber-50 px-3 py-2 mb-2 rounded-[10px]">
              <h1>UserMsg</h1>
            </div>
          </div>
        </>
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
