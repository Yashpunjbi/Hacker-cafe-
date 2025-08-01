import React from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/"); // Login successful, go to home
    } catch (error) {
      alert("Login Failed: " + error.message);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto mt-24 text-center">
      <h2 className="text-xl font-bold mb-6">Login with Google</h2>
      <button
        onClick={handleGoogleLogin}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;