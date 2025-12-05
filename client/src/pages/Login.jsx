import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../components/context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { backendURL, getUserData } = useContext(AppContext);
  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const { email, password } = Object.fromEntries(formData.entries());
      const { data } = await axios.post(backendURL + "/api/user/login", {
        email,
        password,
      });
      axios.defaults.withCredentials = true;
      if (data.success) {
        toast.success("Login successfull🎉");
        getUserData();
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-[calc(100vh-140px)] bg-[#111C2E] flex justify-center items-center px-4">
      <form
        onSubmit={handleLoginFormSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-xl shadow-xl flex flex-col gap-5"
      >
        <h2 className="text-2xl font-bold text-center text-[#06B6D4]">Login</h2>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold text-gray-700">
            Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email"
            className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none 
                       focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/40"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-semibold text-gray-700">
            Password
          </label>
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Enter your password"
            className="border border-gray-400 rounded-md px-3 py-2 focus:outline-none 
                       focus:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4]/40"
            required
          />
        </div>

        <div className="text-right">
          <NavLink
            to="/reset-password"
            className="text-sm text-[#06B6D4] hover:underline"
          >
            Forgot password?
          </NavLink>
        </div>

        <button
          type="submit"
          className="bg-[#06B6D4] hover:bg-[#0894AA] text-white py-2 rounded-md 
                     font-semibold transition-all duration-200"
        >
          Log In
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <NavLink
            to="/register"
            className="text-[#06B6D4] font-semibold hover:underline"
          >
            Sign up
          </NavLink>
        </p>
      </form>
    </div>
  );
};

export default Login;
