import React from "react";

const Sidebar = () => {
  const titles = [
    "Hey, are you there?",
    "What are you doing today?",
    "Bro I need your help",
    "This is really important",
    "Did you check that link?",
    "Call me when you're free",
    "I have some good news",
    "Let's meet tomorrow",
    "I think we should talk",
    "This made me laugh 😂",
    "Did you finish the work?",
    "Send me the file please",
    "Where are you right now?",
    "I'll explain everything",
    "Wait, listen to me first",
    "I can’t believe this!",
    "Guess what happened today",
    "Check your inbox",
    "Let’s fix this together",
    "Bro this is crazy",
    "I have a question",
    "Can you solve this?",
    "Tell me your opinion",
    "I saw something weird",
    "You won’t believe this",
    "This is unbelievable",
    "Bro message me soon",
    "I need an honest answer",
    "Let’s do it properly",
    "I think you’ll like this",
    "Don't forget to reply",
    "I want to tell you something",
    "This is my final decision",
    "Help me understand this",
    "Check this out quickly",
    "I was thinking about this",
    "Let’s start fresh today",
    "This is not what I expected",
    "Bro I trust you",
    "Can you join the call?",
    "I need your confirmation",
    "This made my day",
    "I’m sending the details",
    "Tell me the truth",
    "This is getting interesting",
    "I’m not sure about this",
    "Let's solve it together",
    "Give me one minute",
    "I’ll be there soon",
  ];

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
