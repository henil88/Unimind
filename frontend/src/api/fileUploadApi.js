import axios from "axios";

export const uploadFileToServer = async (formData) => {
  return axios.post(import.meta.env.VITE_BASE_URL + "/msg", formData, {
    withCredentials: true,
  });
};
