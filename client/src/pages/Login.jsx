 import React from "react";

const Login = () => {
  return (
    <div className="min-h-[calc(100vh-140px)] bg-[#111C2E] flex justify-center items-center px-4">

      <form className="w-full max-w-sm bg-white p-6 rounded-xl shadow-xl flex flex-col gap-5 animate-fadein">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-[#06B6D4]">
          Login
        </h2>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none 
                       focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/40"
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-semibold text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none 
                       focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/40"
            required
          />
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <a
            href="#"
            className="text-sm text-[#06B6D4] hover:underline"
          >
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#06B6D4] hover:bg-[#0894AA] text-white py-2 rounded-md 
                     font-semibold transition-all duration-200"
        >
          Log In
        </button>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="text-[#06B6D4] font-semibold hover:underline">
            Sign up
          </a>
        </p>

      </form>

    </div>
  );
};

export default Login;
