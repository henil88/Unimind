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

    // NOTE: backend returns { message, aiRes, prompt } — parse aiRes/prompt
    const payload = res?.data ?? res ?? {};

    // store full payload
    dispatch(fileUploadSuccess(payload));

    const aiRes = payload.aiRes ?? payload.data ?? payload;
    const prompt = payload.prompt ?? null;

    const botText =
      (aiRes && (aiRes.text ?? aiRes.message)) ??
      (typeof aiRes === "string" ? aiRes : "") ??
      "";
    const botFileInfo = aiRes?.fileInfo ?? aiRes?.file ?? payload.fileInfo ?? null;
    const processedData = aiRes?.processedData ?? payload.processedData ?? null;

    if (botText || botFileInfo || processedData) {
      const botMessage = {
        id: (aiRes && aiRes.id) || payload.id || makeId(),
        role: "bot",
        type: botFileInfo ? "file" : "text",
        text: botText,
        processedData,
        fileInfo: botFileInfo,
        replyTo: userMessageId,
        originalPrompt: prompt,
      };
      dispatch(messageReceive(botMessage));
    }
    // otherwise assume backend will emit reply via socket later
  } catch (err) {
    const status = err?.response?.status;
    const errorMsg =
      err?.response?.data?.message || err?.message || "File uploading Failed";

    if (status && status >= 500 && status < 600) {
      // treat 5xx as "processing" — no immediate bot error
      dispatch(fileUploadSuccess({ status: "processing", meta: { status } }));
      return;
    }

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
