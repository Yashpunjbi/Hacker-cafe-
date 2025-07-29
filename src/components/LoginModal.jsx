// src/components/LoginModal.jsx
import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      onClose(); // close modal
      navigate("/"); // go home or wherever
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-sm text-center relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 text-xl hover:text-black"
        >
          &times;
        </button>

        <img
          src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
          alt="pizza-login"
          className="w-20 mx-auto mb-4"
        />
        <h2 className="text-xl font-bold mb-2 text-pink-600">Login to Hacker Cafe</h2>
        <p className="text-sm text-gray-500 mb-4">
          Get exclusive pizza offers and track your orders!
        </p>
        <button
          onClick={handleGoogleLogin}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-5 rounded-full w-full"
        >
          🍕 Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginModal;