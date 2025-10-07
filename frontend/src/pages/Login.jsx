import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/slice/authSlice/authAction";
import { useNavigate } from "react-router-dom";
import Googleauth from "@/components/Googleauth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const formData = (data) => {
    dispatch(userLogin(data, navigate));
  };

  return (
    <div className="w-full h-[calc(100vh-9vh)] flex items-center justify-center">
      <form
        onSubmit={handleSubmit(formData)}
        className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        {/* Email */}
        <label htmlFor="Email" className="font-medium">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter email"
          {...register("email", { required: "Email is required" })}
          className="border p-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        {/* Password with toggle */}
        <label htmlFor="password" className="font-medium">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            {...register("password", { required: "Password is required" })}
            className="border p-2 rounded w-full"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-sm bg-gray-200 px-2 py-1 rounded"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        {/* Error from Redux */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`bg-orange-500 text-white py-2 rounded hover:bg-orange-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <Googleauth />
      </form>
    </div>
  );
};

export default Login;
