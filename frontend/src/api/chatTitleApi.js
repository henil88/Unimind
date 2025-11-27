import { findValidMessage } from "@/lib/findValidMessage";
import axiosInstance from "./axiosInstance";
import { setTitle, addTitleToList } from "@/store/slice/ChatSlice/chatSlic";

export const chatTitle = async (messages, dispatch, titleGenerated) => {
  if (titleGenerated) return;
  const validMsg = findValidMessage(messages);
  // console.log(validMsg);
  if (!validMsg) return;

  const res = await axiosInstance.post("/chat", { msg: validMsg });
  const title = res.data.title;

  if (title === "New Chat") return;

  dispatch(setTitle({ title: res.data.title }));
  dispatch(addTitleToList(res.data.title));
  return res.data.title;
};
