import { setTitle } from "@/store/slice/ChatSlice/chatSlic";
import axiosInstance from "./axiosInstance";

export const chatTitle = async (firstMsg) => {
  const res = await axiosInstance.post("/chat", { msg: firstMsg });
  if (res.data.message === "title ganrated") {
    dispatch(
      setTitle({
        title: res.data.title,
      })
    );
  }
};
