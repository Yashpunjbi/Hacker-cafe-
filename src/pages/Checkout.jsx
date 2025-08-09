import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const navigate = useNavigate();

  const itemsTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryCharge = itemsTotal > 0 ? 20 : 0;
  const totalAmount = itemsTotal + deliveryCharge - discount;

  // Promo code apply logic
  const applyPromo = () => {
    if (promoCode.trim().toLowerCase() === "hacker50") {
      setDiscount(itemsTotal * 0.5);
    } else {
      setDiscount(0);
      alert("Invalid promo code");
    }
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address || !phone) {
      alert("Please fill in all details");
      return;
    }
    // Save order in backend (future)
    clearCart();
    navigate("/order-success");
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Items List */}
          <div className="bg-white p-4 rounded shadow">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b py-2"
              >
                <span>
                  {item.name} x {item.qty}
                </span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          {/* Address */}
          <div className="bg-white p-4 rounded shadow space-y-2">
            <label className="block font-medium">Delivery Address</label>
            <textarea
              className="w-full border p-2 rounded"
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
            ></textarea>

            <label className="block font-medium">Phone Number</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Promo Code */}
          <div className="bg-white p-4 rounded shadow space-y-2">
            <label className="block font-medium">Promo Code</label>
            <div className="flex">
              <input
                type="text"
                className="flex-1 border p-2 rounded-l"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
              />
              <button
                type="button"
                className="bg-green-500 text-white px-4 rounded-r"
                onClick={applyPromo}
              >
                Apply
              </button>
            </div>
          </div>

          {/* Total */}
          <div className="bg-white p-4 rounded shadow text-sm text-gray-600">
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

            {/* Continue to Payment Button */}
            <button
              type="button"
              onClick={() => navigate("/payment-options")}
              className="w-full bg-pink-600 text-white p-2 rounded mt-4"
            >
              Continue to Payment
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Checkout;