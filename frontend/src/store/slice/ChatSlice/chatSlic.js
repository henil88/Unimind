import { createSlice } from "@reduxjs/toolkit";

const initialState = { connected: false, messages: [], title: null };
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // NOTE: cleaned reducers — removed debug logs for production
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
    setTitle: (state, action) => {
      state.title = action.payload.title;
    },
  },
});

export const { messageSend, messageReceive, setConnection, setTitle } =
  chatSlice.actions;
export default chatSlice.reducer;
