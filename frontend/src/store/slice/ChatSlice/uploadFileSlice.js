import { createSlice } from "@reduxjs/toolkit";

const initialState = { file: null, loading: false, error: null };

const uploadFileSlice = createSlice({
  name: "uploadFile",
  initialState,
  reducers: {
    fileUploadReq: (state) => {
      (state.loading = true), (state.error = null);
    },
    fileUploadSuccess: (state, action) => {
      (state.loading = false), (state.file = action.payload.file);
    },
    fileUploadFail: (state, action) => {
      (state.loading = false),
        (state.file = null),
        (state.error = action.payload);
    },
  },
});

export const { fileUploadReq, fileUploadSuccess, fileUploadFail } =
  uploadFileSlice.actions;

export default uploadFileSlice.reducer;
