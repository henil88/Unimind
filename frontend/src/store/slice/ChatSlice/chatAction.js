import { getSocket } from "@/lib/socketInitilize";
import { messageReceive, messageSend, setConnection } from "./chatSlic";

export const listenChatEvent = () => (dispatch) => {
  const socket = getSocket();

  socket.off("connect");
  socket.off("disconnect");
  socket.off("ai-res");
  socket.off("connection_err");

  socket.on("connect", () => {
    console.log("socket connected");
    dispatch(setConnection(true));
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
    dispatch(setConnection(false));
  });

  socket.on("ai-res", (msg) => {
    console.log("bot msg recived", msg);
    dispatch(messageReceive(msg));
  });

  socket.on("connection_err", (err) => {
    console.log("we got some err to connect socket", err);
    dispatch(setConnection(false));
  });
};

export const sendChatMessage = (msg) => (dispatch) => {
  const socket = getSocket();

  socket.emit("msg", msg,() => {
    console.log("msg send to bot", msg);
  });

  dispatch(messageSend(msg));
};
