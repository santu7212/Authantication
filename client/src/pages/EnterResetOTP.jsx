 import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../components/context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EnterResetOTP = () => {
  const { backendURL } = useContext(AppContext);
  const navigate = useNavigate();

  const inputRef = useRef([]);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const email = localStorage.getItem("resetEmail"); // store email when sending OTP

  /* ---------------------------
        OTP HANDLING
    -----------------------------*/
  const getOTP = () =>
    inputRef.current.map((input) => input.value).join("");

  const handleInput = (e, i) => {
    if (e.target.value && i < inputRef.current.length - 1) {
      inputRef.current[i + 1].focus();
    }
  };

  const handlekeyDown = (e, i) => {
    if (e.key === "Backspace" && !e.target.value && i > 0) {
      inputRef.current[i - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "");
    digits.split("").forEach((d, i) => {
      if (inputRef.current[i]) {
        inputRef.current[i].value = d;
      }
    });
  };

  /* ---------------------------
        VERIFY OTP
    -----------------------------*/
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otp = getOTP();

    try {
      const { data } = await axios.post(
        backendURL + "/api/user/verify-reset-otp",
        { email, otp }
      );

      if (data.success) {
        setOtpVerified(true);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  /* ---------------------------
        RESET PASSWORD
    -----------------------------*/
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        backendURL + "/api/user/reset-password",
        { email, newPassword }
      );

      if (data.success) {
        navigate("/login");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <form
        onSubmit={otpVerified ? handleResetPassword : handleVerifyOTP}
        className="flex flex-col items-center p-8 w-[380px] rounded-2xl shadow-xl bg-gradient-to-r from-[#3f4c6b] to-[#606c88]"
      >
        <h2 className="text-white text-3xl font-extrabold">
          {otpVerified ? "Set New Password" : "OTP Verification"}
        </h2>

        {!otpVerified && (
          <>
            <div
              className="flex justify-between gap-4 mt-6"
              onPaste={handlePaste}
            >
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  type="tel"
                  maxLength={1}
                  ref={(el) => (inputRef.current[i] = el)}
                  onInput={(e) => handleInput(e, i)}
                  onKeyDown={(e) => handlekeyDown(e, i)}
                  className="h-12 w-12 bg-white/10 border border-white/40 text-center text-2xl text-white rounded-lg outline-none"
                />
              ))}
            </div>

            <button className="bg-[#4e5d80] text-white px-6 py-2.5 rounded-lg mt-6">
              Verify OTP
            </button>
          </>
        )}

        {otpVerified && (
          <>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-6 px-4 py-2 rounded-lg"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-4 px-4 py-2 rounded-lg"
            />

            <button className="bg-green-600 text-white px-6 py-2.5 rounded-lg mt-6">
              Reset Password
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default EnterResetOTP;
