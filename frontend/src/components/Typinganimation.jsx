import React from "react";

const Typinganimation = () => {
  return (
    <div className="self-start max-w-[90%] w-full flex items-center gap-2 px-3 py-2 mb-2">
      <div className="bg-gray-900 rounded-lg px-4 py-2 flex items-center">
        {/* Tailwind animated typing dots */}
        <div className="flex space-x-1">
          <span
            className="block w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></span>
          <span
            className="block w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></span>
          <span
            className="block w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default Typinganimation;
