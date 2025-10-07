import { createSlice } from "@reduxjs/toolkit";

const initialState = { connected: false, botMessages: [], userMessages: [] };
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    messageSend: (state, action) => {
      state.userMessages.push(action.payload);
    },
    messageReceive: (state, action) => {
      state.botMessages.push(action.payload);
    },
    setConnection: (state, action) => {
      state.connected = action.payload;
    },
  },
});

export const { messageSend, messageReceive, setConnection } = chatSlice.actions;
export default chatSlice.reducer;
