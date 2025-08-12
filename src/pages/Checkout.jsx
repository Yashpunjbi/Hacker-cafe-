import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkingPromo, setCheckingPromo] = useState(false);
  const navigate = useNavigate();

  const deliveryCharge = 30;
  const itemsTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalAmount = itemsTotal + deliveryCharge - discount;

  const handleApplyPromo = () => {
    if (promoApplied) {
      alert("Promo code already applied!");
      return;
    }

    const code = promoCode.trim().toLowerCase();
    setCheckingPromo(true);

    if (code === "free30") {
      setDiscount(30);
      setPromoApplied(true);
      alert("Promo applied: ₹30 off");
    } else if (code === "save50") {
      setDiscount(50);
      setPromoApplied(true);
      alert("Promo applied: ₹50 off");
    } else {
      alert("Invalid promo code!");
    }

    setCheckingPromo(false);
  };

  const handleContinuePayment = (e) => {
    e.preventDefault();

    if (!name || !address || !phone || cart.length === 0) {
      alert("Please fill all details.");
      return;
    }

    navigate("/payment-options", {
      state: {
        name,
        address,
        phone,
        email,
        cart,
        itemsTotal,
        deliveryCharge,
        discount,
        totalAmount,
      },
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold text-center text-pink-600 mb-4">Checkout</h2>

      {/* 🛒 CART ITEMS */}
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
      <form onSubmit={handleContinuePayment} className="space-y-4">
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
          placeholder="Email Address"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* 🎟️ PROMO CODE */}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Promo Code"
            className="flex-1 p-2 border rounded"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            disabled={promoApplied}
          />
          <button
            type="button"
            onClick={handleApplyPromo}
            disabled={promoApplied || checkingPromo}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {checkingPromo
              ? "Checking..."
              : promoApplied
              ? "Applied"
              : "Apply"}
          </button>
        </div>

        {/* 💰 TOTAL */}
        <div className="text-sm text-gray-600 mt-4">
          <div className="flex justify-between mb-1">
            <span>Items Total:</span>
            <span>₹{itemsTotal}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Delivery Charge:</span>
            <span>₹{deliveryCharge}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between mb-1 text-green-600">
              <span>Promo Discount:</span>
              <span>- ₹{discount}</span>
            </div>
          )}
          <div className="flex justify-between font-semibold text-black border-t pt-2">
            <span>Total Payable:</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          className="w-full bg-pink-600 text-white p-2 rounded mt-4"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default Checkout;