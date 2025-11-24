import React from "react";
import VoiceLiquidCircle from "./VoiceLiquidCircle";

const VoicePage = () => {
  const commonClass =
    "bg-red-500 w-14 h-14 flex items-center justify-center rounded-full";
  return (
    <div className="w-full h-full flex items-center justify-center flex-col gap-[10rem]">
      <VoiceLiquidCircle />
      <div className="flex items-center justify-center gap-[2rem] ">
        <i className={`${commonClass} ri-mic-line text-3xl `}></i>
        <i className={`${commonClass} ri-close-line text-4xl`}></i>
      </div>
    </div>
  );
};

export default VoicePage;
