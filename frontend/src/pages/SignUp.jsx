import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const formData = (data) => {
    console.log(data);
  };

  return (
    <div className="w-full h-[calc(100vh-9vh)] flex items-center justify-center">
      {/* 
          👆 h-[calc(100vh-64px)] = full viewport height minus navbar height (64px).
          Adjust 64px to your actual navbar height.
        */}
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

        {/* Full Name */}
        <label htmlFor="FullName" className="font-medium">
          Full Name
        </label>
        <div className="flex gap-4 w-full">
          <div className="flex flex-col flex-1">
            <input
              type="text"
              placeholder="First Name"
              autoComplete="off"
              {...register("first", { required: "First Name Required" })}
              className="border p-2 rounded w-full"
            />
            {errors.first && (
              <p className="text-red-500 text-sm">{errors.first.message}</p>
            )}
          </div>
          <div className="flex flex-col flex-1">
            <input
              type="text"
              placeholder="Last Name"
              autoComplete="off"
              {...register("last", { required: "Last Name Required" })}
              className="border p-2 rounded w-full"
            />
            {errors.last && (
              <p className="text-red-500 text-sm">{errors.last.message}</p>
            )}
          </div>
        </div>

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

        {/* Submit */}
        <button
          type="submit"
          className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
