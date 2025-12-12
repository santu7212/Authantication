import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/context/AppContext";

const ResetPassword = () => {
   const navigate = useNavigate();
   const { backendURL} = useContext(AppContext);
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { email } = Object.fromEntries(formData.entries());
      console.log(email);
      const {data}= await axios.post(backendURL + "/api/user/send-reset-otp",{email})
      if(data.success){
        navigate("/enter-reset-otp")
      }
      
    } catch (error) {}
  };
  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-[#0E172A]">
      <div
        className="w-[380px] min-h-[340px] bg-white border-b-[3px] border-[#4c6bff]
      shadow-[0px_12px_65px_-39px_rgba(0,0,0,1)] rounded-md relative overflow-hidden group p-6"
      >
        {/* Background Icon */}
        <svg
          viewBox="0 0 512 512"
          className="absolute w-[38%] left-[-10%] top-[-10%] fill-[#f4f4f4] 
          transition-all duration-500 group-hover:left-0 group-hover:top-0 
          group-hover:rotate-[180deg] group-hover:scale-[9] group-hover:fill-[#c0c7ec]"
        >
          <path d="M256 176a80 80 0 1080 80 80.24 80.24 0 00-80-80zm172.72 80a165.53 165.53 0 01-1.64 22.34l48.69 38.12a11.59 11.59 0 012.63 14.78l-46.06 79.52a11.64 11.64 0 01-14.14 4.93l-57.25-23a176.56 176.56 0 01-38.82 22.67l-8.56 60.78a11.93 11.93 0 01-11.51 9.86h-92.12a12 12 0 01-11.51-9.53l-8.56-60.78A169.3 169.3 0 01151.05 393L93.8 416a11.64 11.64 0 01-14.14-4.92L33.6 331.57a11.59 11.59 0 012.63-14.78l48.69-38.12A174.58 174.58 0 0183.28 256a165.53 165.53 0 011.64-22.34l-48.69-38.12a11.59 11.59 0 01-2.63-14.78l46.06-79.52a11.64 11.64 0 0114.14-4.93l57.25 23a176.56 176.56 0 0138.82-22.67l8.56-60.78A11.93 11.93 0 01209.94 26h92.12a12 12 0 0111.51 9.53l8.56 60.78A169.3 169.3 0 01361 119l57.2-23a11.64 11.64 0 0114.14 4.92l46.06 79.52a11.59 11.59 0 01-2.63 14.78l-48.69 38.12a174.58 174.58 0 011.64 22.66z" />
        </svg>

        {/* Form Section */}
        <form
          onSubmit={handleResetPassword}
          className="relative z-10 flex flex-col items-center text-center justify-start"
        >
          <p className="text-xl font-bold">Oops!</p>
          <p className="text-base font-semibold mt-1">forgot password?</p>
          <p className="text-sm text-gray-500 mt-1">
            Type your email to recover
          </p>

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full mt-4 h-8 border-b border-[#c0c7ec] bg-transparent outline-none text-sm text-center"
            required
          />

          <button
            type="submit"
            className="mt-5 h-10 w-full rounded-full bg-gradient-to-r from-[#4c6bff] to-[#8196ff]
            text-white text-sm cursor-pointer"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
