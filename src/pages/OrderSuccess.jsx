// src/components/OrderSuccess.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-green-500 flex flex-col justify-center items-center text-white p-6">
      {/* Big Tick Icon */}
      <div className="bg-white rounded-full p-6 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold">Order Successful!</h1>
      <p className="mt-2 text-lg">Thank you for your purchase.</p>

      {/* Back to Home */}
      <Link
        to="/"
        className="mt-6 bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200"
      >
        Back to Home
      </Link>
    </div>
  );
}