import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export default function PaymentOptions() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isApplying, setIsApplying] = useState(false);

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const finalAmount = Math.max(totalAmount - discount, 0);

  const applyPromoCode = async () => {
    if (!promoCode.trim()) {
      alert("Please enter a promo code");
      return;
    }
    setIsApplying(true);
    try {
      const q = query(
        collection(db, "promoCodes"),
        where("code", "==", promoCode.trim())
      );
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const promoData = snapshot.docs[0].data();
        setDiscount(promoData.discount || 0);
        alert(`Promo applied! ₹${promoData.discount} discount.`);
      } else {
        alert("Invalid promo code");
      }
    } catch (err) {
      console.error("Error applying promo:", err);
      alert("Something went wrong while applying promo code");
    }
    setIsApplying(false);
  };

  const confirmOrder = async () => {
    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        items: cartItems,
        totalAmount,
        discount,
        finalAmount,
        paymentMethod,
        status: "Order Confirmed",
        createdAt: serverTimestamp(),
      });

      localStorage.removeItem("cartItems");
      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Choose Payment Method</h2>

      {/* Payment Method */}
      <div className="space-y-3">
        <label className="block p-3 border rounded cursor-pointer bg-white">
          <input
            type="radio"
            value="COD"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
            className="mr-2"
          />
          Cash on Delivery
        </label>

        <label className="block p-3 border rounded cursor-pointer bg-white">
          <input
            type="radio"
            value="UPI"
            checked={paymentMethod === "UPI"}
            onChange={() => setPaymentMethod("UPI")}
            className="mr-2"
          />
          UPI Payment
          {paymentMethod === "UPI" && (
            <div className="mt-2 p-3 border rounded bg-gray-100">
              <p className="text-sm">
                Scan this QR or use UPI ID:{" "}
                <strong>hacker@upi</strong>
              </p>
              <img src="/upi-qr.png" alt="UPI QR" className="w-32 mt-2" />
            </div>
          )}
        </label>
      </div>

      {/* Promo Code */}
      <div className="mt-4 p-3 border rounded bg-white">
        <h3 className="font-semibold mb-2">Apply Promo Code</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter promo code"
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={applyPromoCode}
            disabled={isApplying}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isApplying ? "Applying..." : "Apply"}
          </button>
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-4 p-3 border rounded bg-gray-50">
        <p className="text-lg">Total: <strong>₹{totalAmount}</strong></p>
        <p className="text-green-600">Discount: ₹{discount}</p>
        <p className="text-lg font-bold">
          Final Amount: ₹{finalAmount}
        </p>
      </div>

      {/* Confirm Button */}
      <button
        onClick={confirmOrder}
        className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded text-lg font-semibold"
      >
        Confirm Order
      </button>
    </div>
  );
}