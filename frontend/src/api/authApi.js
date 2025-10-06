import axiosInstance from "./axiosInstance";

export const registerUserApi = async (data) =>
  await axiosInstance.post("/auth/register", data);

export const loginUser = async (data) =>
  await axiosInstance.post("/auth/login", data);

export const googleAuthApi = async (data) =>
  await axiosInstance.get("/auth/loginOauth2");
