import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/slice/authSlice/authSlice";
import chatReducer from "@/store/slice/ChatSlice/chatSlic";
import fileUploadSlice from "@/store/slice/ChatSlice/uploadFileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    file: fileUploadSlice,
  },
});
