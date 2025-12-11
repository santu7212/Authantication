import React, { useContext, useRef } from "react";
import { AppContext } from "../components/context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const inputRef = useRef([]);
  const handleInput = (e, i) => {
    if (e.target.value.length > 0 && i < inputRef.current.length - 1) {
      inputRef.current[i + 1].focus();
    }
  };

  const handlekeyDown = (e, i) => {
    if (e.key == "Backspace" && e.target.value == "" && i > 0) {
      inputRef.current[i - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
      }
    });
  };

  const navigate = useNavigate();

  const { backendURL } = useContext(AppContext);

  const resendVerificationOTP = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendURL + "/api/user/send-otp");

      if (data?.success) {
        navigate("/verify-email");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="flex flex-col items-center p-8 w-[380px] rounded-2xl shadow-[0_60px_60px_-20px_rgba(0,0,0,0.45)] bg-gradient-to-r from-[#3f4c6b] to-[#606c88]">
        {/* Title + Description */}
        <div className="text-center mb-4">
          <h2 className="text-white text-3xl font-extrabold tracking-tight">
            OTP Verification
          </h2>
          <p className="text-white text-base mt-3">
            Please enter the code we have sent you.
          </p>
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-between gap-4 mt-4" onPaste={handlePaste}>
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <input
              key={i}
              type="tel"
              maxLength={1}
              ref={(e) => (inputRef.current[i] = e)}
              onInput={(e) => handleInput(e, i)}
              onKeyDown={(e) => handlekeyDown(e, i)}
              className="h-12 w-12 bg-white/10 border border-white/40 text-center text-2xl text-white rounded-lg outline-none focus:border-indigo-400"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button className="bg-[#4e5d80] text-white px-6 py-2.5 rounded-lg mt-6 text-sm font-semibold transition hover:bg-[#3f4c6b]">
          Verify
        </button>

        {/* Resend */}
        <p className="text-white mt-4 text-sm text-center">
          You don't receive the code?
          <span
            onClick={resendVerificationOTP}
            className="ml-2 cursor-pointer font-semibold hover:underline"
          >
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
