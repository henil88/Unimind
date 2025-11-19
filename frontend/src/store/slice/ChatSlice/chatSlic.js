import { createSlice } from "@reduxjs/toolkit";

const initialState = { connected: false, messages: [] };
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // action payload must be a message object:
    // { id, role: "user"|"bot", type: "text"|"file", text?, file?, fileInfo?, processedData? }
    messageSend: (state, action) => {
      state.messages.push(action.payload);
    },
    messageReceive: (state, action) => {
      state.messages.push(action.payload);
    },
    setConnection: (state, action) => {
      state.connected = action.payload;
    },
  },
});

export const { messageSend, messageReceive, setConnection } = chatSlice.actions;
export default chatSlice.reducer;
