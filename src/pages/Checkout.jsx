import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart } = useCart();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("Select Address"); // default
  const navigate = useNavigate();

  const deliveryCharge = 30;
  const codCharge = 20; // Cash on Delivery charge
  const itemsTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalAmount = itemsTotal + deliveryCharge + codCharge;

  const handleContinuePayment = (e) => {
    e.preventDefault();

    if (!phone || address === "Select Address" || cart.length === 0) {
      alert("Please enter phone number and select address.");
      return;
    }

    navigate("/payment-options", {
      state: {
        phone,
        address,
        cart,
        itemsTotal,
        deliveryCharge,
        codCharge,
        totalAmount,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white px-4 pt-6 pb-28 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-red-500 mb-6">
        Checkout
      </h2>

      {/* CART SUMMARY */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-2">Your Cart</h3>
        {cart.length === 0 ? (
          <p className="text-gray-500">Cart is empty.</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span>{item.name} x {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ORDER FORM */}
      <form onSubmit={handleContinuePayment} className="space-y-4">
        {/* Mobile Number */}
        <input
          type="tel"
          placeholder="Mobile Number"
          className="w-full p-3 border rounded-xl text-gray-800"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        {/* Address Selector */}
        <select
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-3 border rounded-xl text-gray-800"
          required
        >
          <option disabled>Select Address</option>
          <option>Home</option>
          <option>Office</option>
          <option>Other</option>
        </select>

        {/* SUMMARY */}
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 space-y-2">
          <div className="flex justify-between">
            <span>Items Total:</span>
            <span>₹{itemsTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charge:</span>
            <span>₹{deliveryCharge}</span>
          </div>
          <div className="flex justify-between">
            <span>COD Charge:</span>
            <span>₹{codCharge}</span>
          </div>
          <div className="flex justify-between font-semibold text-red-500 border-t pt-2">
            <span>Total Payable:</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default Checkout;