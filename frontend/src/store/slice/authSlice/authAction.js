import { googleAuthApi, loginUser, registerUserApi } from "@/api/authApi";
import { authFail, authRequest, authSucces } from "./authSlice";

export const registerUser = (userData, navigate) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const res = await registerUserApi(userData);
    console.log(res.data);
    dispatch(authSucces(res.data));
    navigate("/");
  } catch (err) {
    console.log(err);
    dispatch(authFail(err.response?.data?.message || "registration fail"));
  }
};

export const userLogin = (userData, navigate) => async (dispatch) => {
  dispatch(authRequest());
  try {
    const res = await loginUser(userData);
    dispatch(authSucces(res.data));
    navigate("/");
    console.log(res.data);
  } catch (err) {
    dispatch(authFail(err.response?.data?.message || "Login Failed"));
    console.log(err);
  }
};

export const auth2Login = () => async (dispatch) => {
  dispatch(authRequest());
  try {
    const res = await googleAuthApi();
    dispatch(authSucces(res.data));
    console.log(res.data);
  } catch (err) {
    dispatch(authFail(err.response?.data?.message || "Google Login Failed"));
  }
};
