import { chatTitle } from "@/api/chatTitleApi";
import { findValidMessage } from "@/lib/findValidMessage";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const { titles } = useSelector((state) => state.chat);
  const { messages, titleGenerated } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    const validMsg = findValidMessage(messages);

    if (!titleGenerated && validMsg) {
      chatTitle(messages, dispatch, titleGenerated);
    }
  }, [messages]);

  return (
    <div
      className="bg-[#F2F4F7] h-screen absolute top-0 left-0
      xs:w-1/2 sm:w-1/2 sm:max-w-[200px] ms:max-w-[200px] 
      md:max-w-2/7 lg:max-w-[16rem] border-r border-[#E0E2E5] overflow-y-auto"
    >
      <div className="p-3 text-sm font-semibold text-[#4A4A4A]">Chats</div>

      <ul>
        {titles.map((tit, i) => (
          <li
            key={i}
            className="px-3 py-2 text-[14px] text-[#1A1A1A] cursor-pointer hover:bg-[#E7E9EC] rounded-md mx-2"
          >
            {tit.length > 28 ? tit.slice(0, 28) + "..." : tit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
