import { getSocket } from "@/lib/socketInitilize";
import { messageReceive, messageSend, setConnection } from "./chatSlic";

const makeId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export const listenChatEvent = () => (dispatch) => {
  const socket = getSocket();

  socket.off("connect");
  socket.off("disconnect");
  socket.off("ai-res");
  socket.off("bot_message");
  socket.off("connection_err");

  socket.on("connect", () => {
    dispatch(setConnection(true));
  });

  socket.on("disconnect", () => {
    dispatch(setConnection(false));
  });

  // Keep only essential listeners — normalized payload -> messageReceive
  socket.on("ai-res", (msg) => {
    const normalized =
      typeof msg === "string"
        ? { id: makeId(), role: "bot", type: "text", text: msg }
        : {
            id: msg.id || makeId(),
            role: "bot",
            type: msg.type || "text",
            text: msg.text ?? msg.data ?? msg.message ?? "",
            processedData: msg.processedData ?? null,
            fileInfo: msg.fileInfo ?? null,
          };
    dispatch(messageReceive(normalized));
  });

  socket.on("bot_message", (msg) => {
    const normalized =
      typeof msg === "string"
        ? { id: makeId(), role: "bot", type: "text", text: msg }
        : {
            id: msg.id || makeId(),
            role: "bot",
            type: msg.type || "text",
            text: msg.text ?? msg.data ?? msg.message ?? "",
            processedData: msg.processedData ?? null,
            fileInfo: msg.fileInfo ?? null,
          };
    dispatch(messageReceive(normalized));
  });

  socket.on("connection_err", (err) => {
    console.warn("socket connection err:", err);
    dispatch(setConnection(false));
  });
};

export const sendChatMessage = (msg) => (dispatch) => {
  const socket = getSocket();

  let messageObj;
  if (typeof msg === "string") {
    messageObj = {
      id: makeId(),
      role: "user",
      type: "text",
      text: msg,
    };

    // emit legacy "msg" event for text so backend receives it
    try {
      socket.emit("msg", messageObj.text);
    } catch (err) {
      // ignore emit errors silently
    }
  } else {
    messageObj = {
      id: msg.id || makeId(),
      role: "user",
      type: msg.type || "text",
      text: msg.text ?? "",
      file: msg.file ?? null,
      fileInfo: msg.fileInfo ?? null,
    };

    if (messageObj.type === "text") {
      try {
        socket.emit("msg", messageObj.text);
      } catch (err) {
        // ignore
      }
    }
    // file-type messages are uploaded via REST (uploadFile) — no socket emit here
  }

  // store locally immediately
  dispatch(messageSend(messageObj));
};
