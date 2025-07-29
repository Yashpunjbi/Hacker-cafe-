import React, { useState } from "react";
import { auth } from "../firebase/FirebaseAuth";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const LoginModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    setError("");

    if (!phone.match(/^[6-9]\d{9}$/)) {
      setError("Valid Indian phone number daalo");
      return;
    }

    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
        callback: () => {},
      });

      const appVerifier = window.recaptchaVerifier;
      const fullPhone = "+91" + phone;

      const result = await signInWithPhoneNumber(auth, fullPhone, appVerifier);
      setConfirmationResult(result);
      setStep("otp");
    } catch (err) {
      console.log(err);
      setError("OTP bhejne me problem hai");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp);
      onClose(); // Close modal on success
    } catch (err) {
      setError("Galat OTP");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err) {
      console.error(err);
      setError("Google login failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-2xl">×</button>

        <h2 className="text-2xl font-bold text-center text-red-600 mb-4">Login to Hacker Café 🍕</h2>

        {step === "phone" && (
          <>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone (e.g. 9876543210)"
              className="w-full px-4 py-2 border rounded-lg mb-3"
            />
            <button
              onClick={handleSendOtp}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg"
            >
              Send OTP 📲
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border rounded-lg mb-3"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
            >
              Verify OTP ✅
            </button>
          </>
        )}

        <div className="my-4 text-center text-gray-500">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Google__G__logo.svg" alt="G" className="h-5" />
          Login with Google
        </button>

        {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}

        <div id="recaptcha"></div>
      </div>
    </div>
  );
};

export default LoginModal;