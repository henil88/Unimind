import RotatingText from "@/components/RotatingText";

const RotatingTextDemo = () => {
  return (
    <>
      <RotatingText
        texts={["Thinking", "Chatting", "Searching", "Learning", "Connecting"]}
        mainClassName="px-2 sm:px-2 md:px-3 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 font-exo justify-center rounded-[5px] bg-amber-100 "
        staggerFrom={"last"}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-120%" }}
        staggerDuration={0.025}
        splitLevelClassName="overflow-hidden "
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        rotationInterval={2000}
      />
    </>
  );
};

export default RotatingTextDemo;
