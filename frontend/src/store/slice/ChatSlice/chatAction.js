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
    console.log("socket connected");
    dispatch(setConnection(true));
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected");
    dispatch(setConnection(false));
  });

  // keep listening for legacy AI responses
  socket.on("ai-res", (msg) => {
    console.log("ai-res received", msg);
    const normalized =
      typeof msg === "string"
        ? { id: makeId(), role: "bot", type: "text", text: msg }
        : {
            id: msg.id || makeId(),
            role: "bot",
            type: msg.type || "text",
            text: msg.text ?? msg.data ?? "",
            processedData: msg.processedData ?? null,
            fileInfo: msg.fileInfo ?? null,
          };
    dispatch(messageReceive(normalized));
  });

  // also handle bot_message if backend uses it
  socket.on("bot_message", (msg) => {
    console.log("bot_message received", msg);
    const normalized =
      typeof msg === "string"
        ? { id: makeId(), role: "bot", type: "text", text: msg }
        : {
            id: msg.id || makeId(),
            role: "bot",
            type: msg.type || "text",
            text: msg.text ?? msg.data ?? "",
            processedData: msg.processedData ?? null,
            fileInfo: msg.fileInfo ?? null,
          };
    dispatch(messageReceive(normalized));
  });

  socket.on("connection_err", (err) => {
    console.log("we got some err to connect socket", err);
    dispatch(setConnection(false));
  });
};

export const sendChatMessage = (msg) => (dispatch) => {
  // msg can be a string (text) or a message object
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
      socket.emit("msg", messageObj.text, () => {
        console.log("msg emitted (text)", messageObj.text);
      });
    } catch (err) {
      console.warn("socket emit failed", err);
    }
  } else {
    // object message (could be file or text object). Create normalized messageObj
    messageObj = {
      id: msg.id || makeId(),
      role: "user",
      type: msg.type || "text",
      text: msg.text ?? "",
      file: msg.file ?? null,
      fileInfo: msg.fileInfo ?? null,
    };

    // If it's a text object explicitly, still emit via "msg" for backend compatibility
    if (messageObj.type === "text") {
      try {
        socket.emit("msg", messageObj.text, () => {
          console.log("msg emitted (text object)", messageObj.text);
        });
      } catch (err) {
        console.warn("socket emit failed", err);
      }
    }
    // If it's a file-type message, do NOT emit here — uploadFile (REST) is used instead.
  }

  // store locally immediately
  dispatch(messageSend(messageObj));
};
