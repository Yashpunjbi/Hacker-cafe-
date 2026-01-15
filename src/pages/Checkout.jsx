import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const deliveryCharge = 30;
  const codCharge = 20;
  const itemsTotal = cart.reduce((a, b) => a + b.price * b.qty, 0);
  const totalAmount = itemsTotal + deliveryCharge + codCharge;

  const handleSubmit = () => {
    if (!phone && !email) {
      alert("Enter phone or verify email");
      return;
    }

    navigate("/payment-options", {
      state: {
        phone,
        address,
        email,
        cart,
        totalAmount,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-28">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center gap-3 shadow-sm">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <h2 className="text-lg font-semibold">Checkout</h2>
      </div>

      <div className="p-4 space-y-6">
        {/* Delivery Location */}
        <div className="bg-white rounded-xl p-4 space-y-3">
          <h3 className="font-semibold">Delivery Location</h3>

          <button className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg font-medium">
            <MapPin size={18} />
            Use My Current Location
          </button>

          <input
            type="text"
            placeholder="House / Flat No., Landmark"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Phone Number */}
        <div className="bg-white rounded-xl p-4 space-y-3">
          <h3 className="font-semibold">Phone Number</h3>
          <input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Email Verification */}
        <div className="bg-white rounded-xl p-4 space-y-3">
          <h3 className="font-semibold">Email Verification (Optional)</h3>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border rounded-lg p-3"
            />
            <button className="px-4 bg-gray-800 text-white rounded-lg">
              Send OTP
            </button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl p-4 space-y-3">
          <h3 className="font-semibold">Payment Method</h3>

          <div className="flex items-center gap-3 border rounded-lg p-3">
            <span className="text-green-600 text-xl">💵</span>
            <span className="font-medium">Cash on Delivery</span>
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-white rounded-xl p-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span>Items Total</span>
            <span>₹{itemsTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charge</span>
            <span>₹{deliveryCharge}</span>
          </div>
          <div className="flex justify-between">
            <span>COD Charge</span>
            <span>₹{codCharge}</span>
          </div>
          <div className="flex justify-between font-semibold border-t pt-2">
            <span>Total Payable</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleSubmit}
          className={`w-full py-4 rounded-xl font-semibold text-white ${
            phone || email
              ? "bg-gray-900"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Enter Phone OR Verify Email
        </button>
      </div>
    </div>
  );
};

export default Checkout;