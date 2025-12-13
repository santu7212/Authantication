 import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/context/AppContext";

const ResetPassword = () => {
  const { backendURL } = useContext(AppContext);
  const navigate = useNavigate();

  const [step, setStep] = useState("EMAIL"); // EMAIL | OTP | PASSWORD
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const otpRef = useRef([]);

  /* ================= STEP 1: SEND OTP ================= */
  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendURL + "/api/user/send-reset-otp",
        { email }
      );

      if (data.success) {
        setStep("OTP");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to send OTP");
    }
  };

  /* ================= STEP 2: VERIFY OTP (CLIENT SIDE ONLY) ================= */
  const handleOTPSubmit = (e) => {
    e.preventDefault();

    const enteredOtp = otpRef.current.map((i) => i.value).join("");

    if (enteredOtp.length !== 6) {
      return alert("Please enter 6-digit OTP");
    }

    // we do NOT call backend here
    // backend verifies OTP when resetting password
    setOtp(enteredOtp);
    setStep("PASSWORD");
  };

  /* ================= STEP 3: RESET PASSWORD ================= */
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        backendURL + "/api/user/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );

      if (data.success) {
        navigate("/login");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Password reset failed");
    }
  };

  /* ================= OTP UX ================= */
  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    e.target.value = value;

    if (value && index < 5) {
      otpRef.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpRef.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");

    paste.split("").forEach((char, index) => {
      if (otpRef.current[index]) {
        otpRef.current[index].value = char;
      }
    });

    const lastIndex = Math.min(paste.length, 6) - 1;
    otpRef.current[lastIndex]?.focus();
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-[#0E172A]">
      <form
        onSubmit={
          step === "EMAIL"
            ? handleSendOTP
            : step === "OTP"
            ? handleOTPSubmit
            : handleResetPassword
        }
        className="w-[380px] bg-white p-6 rounded-xl shadow-xl"
      >
        <h2 className="text-xl font-bold text-center mb-4">
          {step === "EMAIL" && "Forgot Password"}
          {step === "OTP" && "Enter OTP"}
          {step === "PASSWORD" && "Set New Password"}
        </h2>

        {/* ============ EMAIL ============ */}
        {step === "EMAIL" && (
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border-b py-2 text-center outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}

        {/* ============ OTP ============ */}
        {step === "OTP" && (
          <div className="flex justify-between mt-6" onPaste={handleOtpPaste}>
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                ref={(el) => (otpRef.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                onChange={(e) => handleOtpChange(e, i)}
                onKeyDown={(e) => handleOtpKeyDown(e, i)}
                className="w-12 h-12 border rounded text-center text-xl outline-none"
              />
            ))}
          </div>
        )}

        {/* ============ PASSWORD ============ */}
        {step === "PASSWORD" && (
          <>
            <input
              type="password"
              placeholder="New password"
              className="w-full border-b py-2 mt-4 outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full border-b py-2 mt-4 outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </>
        )}

        <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg">
          {step === "EMAIL" && "Send OTP"}
          {step === "OTP" && "Verify OTP"}
          {step === "PASSWORD" && "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
