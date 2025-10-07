import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slice/authSlice/authSlice";
import chatReducer from "@/store/slice/ChatSlice/chatSlic";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});
