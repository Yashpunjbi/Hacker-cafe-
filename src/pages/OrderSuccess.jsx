// src/pages/OrderSuccess.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-4">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Order Placed Successfully!
      </h1>
      <p className="text-lg mb-6">
        Thank you for shopping with Hacker Cafe. Your order will be processed
        soon.
      </p>
      <Link
        to="/"
        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
      >
        Go to Home
      </Link>
    </div>
  );
}