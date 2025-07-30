// src/pages/Checkout.jsx

import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { db, auth } from "../firebase"; // Make sure firebase.js is setup
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email); // ✅ Store logged-in user's email
      }
    });
    return () => unsubscribe();
  }, []);

  const handleOrder = async (e) => {
    e.preventDefault();

    if (!name || !address || !phone || cart.length === 0) {
      alert("Please fill all details and add items to cart");
      return;
    }

    const orderData = {
      name,
      address,
      phone,
      email, // ✅ Important for order history
      items: cart,
      total,
      status: "Pending",
      createdAt: Timestamp.now(),
    };

    try {
      await addDoc(collection(db, "orders"), orderData);
      clearCart();
      alert("Order placed successfully!");
      navigate("/"); // Redirect to home
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">
        Checkout
      </h2>
      <form onSubmit={handleOrder} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Address"
          className="w-full p-2 border rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-pink-600 text-white p-2 rounded"
        >
          Place Order (₹{total})
        </button>
      </form>
    </div>
  );
};

export default Checkout;