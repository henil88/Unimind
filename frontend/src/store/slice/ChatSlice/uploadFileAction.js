import { uploadFileToServer } from "@/api/fileUploadApi";
import {
  fileUploadFail,
  fileUploadReq,
  fileUploadSuccess,
} from "./uploadFileSlice";

export const uploadFile = (data) => async (dispatch) => {
  dispatch(fileUploadReq());
  try {
    const res = await uploadFileToServer(data);
    console.log(res.data);
    dispatch(fileUploadSuccess(res.data));
  } catch (err) {
    console.log(err);
    dispatch(
      fileUploadFail(err.response?.data?.message || "File uploading Failed")
    );
  }
};
