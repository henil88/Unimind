import axios from "axios";
import axiosInstance from "./axiosInstance";

// export const uploadFileToServer = async (file) => {
//   await axiosInstance.post("/msg/", file);
// };
export const uploadFileToServer = async (formData) => {
  return axios.post(import.meta.env.VITE_BASE_URL + "/msg", formData, {
    withCredentials: true,
  });
};
