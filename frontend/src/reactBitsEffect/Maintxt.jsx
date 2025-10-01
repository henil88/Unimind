import React from "react";
import SplitText from "@/components/SplitText";
const Maintxt = () => {
  return (
    <>
      <SplitText
        text="UniMind Your AI Assistant"
        className=" text-5xl font-semibold font-exo leading-[3.2rem] text-center uppercase ms:text-[3.5rem] ms:leading-[4rem] md:text-[4.5rem]  md:leading-[5rem] lg:ml-[3%] lg:text-[5vw] lg:leading-[5.5rem]"
        delay={100}
        duration={0.6}
        ease="power3.out"
        splitType="chars"
        from={{ opacity: 0, y: 40 }}
        to={{ opacity: 1, y: 0 }}
        threshold={0.1}
        rootMargin="-100px"
        textAlign="center"
      />
    </>
  );
};

export default Maintxt;
