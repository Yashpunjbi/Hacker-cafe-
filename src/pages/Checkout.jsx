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
  const [timeSlot, setTimeSlot] = useState("");
  const navigate = useNavigate();

  const deliveryCharge = 30;
  const itemsTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalAmount = itemsTotal + deliveryCharge;

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

    if (!name || !address || !phone || !timeSlot || cart.length === 0) {
      alert("Please fill all details and select a delivery time slot.");
      return;
    }

    const orderData = {
      name,
      address,
      phone,
      email,
      items: cart,
      itemsTotal,
      deliveryCharge,
      total: totalAmount,
      timeSlot,
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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">Checkout</h2>

      {/* 🛒 CART ITEMS PREVIEW */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Your Cart</h3>
        {cart.length === 0 ? (
          <p className="text-gray-500">Cart is empty.</p>
        ) : (
          <ul className="space-y-3">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-4 p-2 border rounded-md"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🧾 ORDER FORM */}
      <form onSubmit={handleOrder} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Delivery Address"
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
        <input
          type="email"
          value={email}
          readOnly
          className="w-full p-2 border rounded bg-gray-100 cursor-not-allowed"
        />
        <select
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Delivery Time Slot</option>
          <option value="12:00 PM – 2:00 PM">12:00 PM – 2:00 PM</option>
          <option value="2:00 PM – 4:00 PM">2:00 PM – 4:00 PM</option>
          <option value="4:00 PM – 6:00 PM">4:00 PM – 6:00 PM</option>
          <option value="6:00 PM – 8:00 PM">6:00 PM – 8:00 PM</option>
        </select>

        <div className="text-sm text-gray-600 mt-4">
          <div className="flex justify-between mb-1">
            <span>Items Total:</span>
            <span>₹{itemsTotal}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Delivery Charge:</span>
            <span>₹{deliveryCharge}</span>
          </div>
          <div className="flex justify-between font-semibold text-black border-t pt-2">
            <span>Total Payable:</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white p-2 rounded mt-4"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;