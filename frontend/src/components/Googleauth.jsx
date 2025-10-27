import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Googleauth = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { loading, error } = useSelector((state) => state.auth);

  const loginWithGoogle = () => {
    window.location.href = import.meta.env.VITE_REDIREC_URL;
    console.log("loginwithgoogle click");
  };
  return (
    <div>
      <div className="items-center flex justify-center gap-5 mb-2">
        <div className="h-[1px] bg-black w-[30%]"></div>
        <p>OR</p>
        <div className="h-[1px] bg-black w-[30%]"></div>
      </div>
      <button
        type="button"
        // disabled={loading}
        onClick={loginWithGoogle}
        className={`bg-orange-500 text-white py-2 px-2 w-full rounded hover:bg-orange-600 flex items-center justify-center gap-2`}
      >
        <i className="ri-google-fill text-2xl"></i>
        continue with google
        {/* {loading ? "Logging in..." : "Login"} */}
      </button>
    </div>
  );
};

export default Googleauth;
