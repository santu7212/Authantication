 import React from "react";
import { NavLink } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-[80vh] bg-[#111C2E] flex items-center justify-center px-4">
      <form className="bg-white w-full max-w-md rounded-xl shadow-xl p-8 space-y-6">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-center text-[#0E172A]">
          Create Account
        </h2>

        {/* Username */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            required
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4]"
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            required
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4]"
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            required
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-[#06B6D4] focus:border-[#06B6D4]"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#06B6D4] hover:bg-[#0795ad] transition text-white font-semibold py-2 rounded-lg"
        >
          Register
        </button>

        {/* Already Have an Account */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-[#06B6D4] font-semibold hover:underline"
          >
            Login
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;
