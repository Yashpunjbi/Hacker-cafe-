import React, { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleOrder = () => {
    if (!name || !phone || !address) return alert("Please fill all details");
    alert("Order Placed Successfully!");
    setCartItems([]);
  };

  return (
    <div className="p-4 mb-20">
      <h2 className="text-xl font-bold mb-4 text-center text-green-600">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Cart is empty.</p>
      ) : (
        <ul className="space-y-2 mb-4">
          {cartItems.map((item, i) => (
            <li key={i} className="flex justify-between border-b pb-1">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 space-y-2">
        <input
          className="border p-2 w-full rounded"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border p-2 w-full rounded"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          className="border p-2 w-full rounded"
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
        <button
          className="bg-green-500 text-white w-full p-2 rounded hover:bg-green-600"
          onClick={handleOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;

