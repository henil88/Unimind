import { uploadFileToServer } from "@/api/fileUploadApi";
import {
  fileUploadFail,
  fileUploadReq,
  fileUploadSuccess,
} from "./uploadFileSlice";
import { messageReceive } from "./chatSlic";

const makeId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

export const uploadFile = (data, userMessageId = null) => async (dispatch) => {
  dispatch(fileUploadReq());
  try {
    const res = await uploadFileToServer(data);
    // robust extraction of payload
    const payload = res?.data ?? res ?? {};

    // notify upload slice with full payload
    dispatch(fileUploadSuccess(payload));

    // normalize bot response (if backend returned immediate processed result)
    const result = payload;
    if (
      result &&
      (result.text ||
        result.type ||
        result.fileInfo ||
        result.processedData)
    ) {
      const botMessage = {
        id: result.id || makeId(),
        role: "bot",
        type: result.type || (result.fileInfo ? "file" : "text"),
        text:
          result.text ??
          result.message ??
          result.data ??
          (typeof result === "string" ? result : ""),
        processedData: result.processedData ?? null,
        fileInfo: result.fileInfo ?? result.file ?? null,
        replyTo: userMessageId,
      };
      dispatch(messageReceive(botMessage));
    }
    // If payload contains no reply info, assume backend will send reply via socket later.
  } catch (err) {
    console.error(err);
    const status = err?.response?.status;
    const errorMsg =
      err?.response?.data?.message || err?.message || "File uploading Failed";

    // If backend returned 5xx, assume async processing — do not show immediate bot error.
    if (status && status >= 500 && status < 600) {
      // mark as "processing" success so UI doesn't show a failure
      dispatch(fileUploadSuccess({ status: "processing", meta: { status } }));
      // do NOT dispatch messageReceive error; wait for socket reply
      return;
    }

    // Non-5xx errors are shown as failures
    dispatch(fileUploadFail(errorMsg));

    dispatch(
      messageReceive({
        id: makeId(),
        role: "bot",
        type: "error",
        text: errorMsg,
        replyTo: userMessageId,
      })
    );
  }
};
