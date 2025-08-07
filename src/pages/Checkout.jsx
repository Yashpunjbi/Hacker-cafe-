import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
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
        setEmail(user.email);
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
      email,
      items: cart,
      total,
      status: "Placed",
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "orders"), orderData);
      clearCart();
      alert("Order placed successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
        🚀 Confirm Your Order
      </h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Cart is empty!</p>
      ) : (
        <>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Order Summary</h3>
            <ul className="space-y-2">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between text-sm text-gray-700">
                  <span>{item.name} × {item.qty}</span>
                  <span>₹{item.price * item.qty}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4 font-bold text-lg text-gray-900">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
          </div>

          <form onSubmit={handleOrder} className="space-y-4">
            <input
              type="text"
              placeholder="Your Full Name"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <textarea
              placeholder="Delivery Address"
              className="w-full p-3 border border-gray-300 rounded h-24 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold transition"
            >
              ✅ Place Order — ₹{total}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;