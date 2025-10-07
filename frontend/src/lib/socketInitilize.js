import { io } from "socket.io-client";

let socket;

export const initSocket = (url) => {
  if (!socket) {
    socket = io(url);
  }
  return socket;
};

export const getSocket = () => {
  if (!socket)
    throw new Error("Socket not initialized. Call initSocket first.");
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
