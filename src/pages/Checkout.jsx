import React, { useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Checkout() {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");
  const [cartTotal, setCartTotal] = useState(500); // Example total

  const applyPromo = async () => {
    setError("");
    if (!promoCode.trim()) {
      setError("Please enter a promo code.");
      return;
    }

    try {
      const q = query(
        collection(db, "promoCodes"),
        where("code", "==", promoCode.toUpperCase()),
        where("isActive", "==", true)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Invalid or expired promo code.");
        return;
      }

      const promoData = querySnapshot.docs[0].data();

      // Check expiry date
      if (promoData.expiryDate) {
        const today = new Date();
        const expiry = new Date(promoData.expiryDate);
        if (today > expiry) {
          setError("Promo code expired.");
          return;
        }
      }

      // Calculate discount
      let discountAmount = 0;
      if (promoData.discountType === "percentage") {
        discountAmount = (cartTotal * promoData.discountValue) / 100;
      } else if (promoData.discountType === "flat") {
        discountAmount = promoData.discountValue;
      }

      setDiscount(discountAmount);
    } catch (err) {
      console.error("Error applying promo code:", err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1">Promo Code</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter promo code"
            className="border rounded px-3 py-2 flex-1"
          />
          <button
            onClick={applyPromo}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Apply
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <div className="border-t pt-4">
        <p>Cart Total: ₹{cartTotal}</p>
        <p>Discount: ₹{discount}</p>
        <p className="font-bold">
          Final Total: ₹{cartTotal - discount}
        </p>
      </div>
    </div>
  );
}