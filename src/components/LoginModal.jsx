import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const LoginModal = ({ onClose }) => {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Login successful!");
      onClose(); // Close modal on success
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md text-center shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-pink-600">Login to Order</h2>
        <p className="mb-6 text-gray-600">Sign in with your Google account to continue.</p>
        <button
          onClick={handleGoogleLogin}
          className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-full w-full font-semibold transition duration-200"
        >
          Continue with Google
        </button>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:text-pink-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginModal;