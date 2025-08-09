import { useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs, Timestamp } from "firebase/firestore";

export default function Cart() {
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState("");

  const cartTotal = 500; // example total amount

  const applyPromo = async () => {
    if (!promoCode.trim()) {
      setError("Please enter a promo code");
      return;
    }

    try {
      const promoRef = collection(db, "promoCodes");
      const q = query(promoRef, where("code", "==", promoCode.trim()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("Invalid promo code");
        setDiscount(0);
        return;
      }

      const promoData = querySnapshot.docs[0].data();

      // Check expiry date
      if (promoData.expiryDate && promoData.expiryDate.toDate() < new Date()) {
        setError("Promo code expired");
        setDiscount(0);
        return;
      }

      // Check min order value
      if (promoData.minOrderValue && cartTotal < promoData.minOrderValue) {
        setError(`Minimum order value is ₹${promoData.minOrderValue}`);
        setDiscount(0);
        return;
      }

      // Apply discount
      if (promoData.discountType === "percentage") {
        const discountAmount = (cartTotal * promoData.discountValue) / 100;
        setDiscount(discountAmount);
      } else if (promoData.discountType === "flat") {
        setDiscount(promoData.discountValue);
      }

      setError("");
    } catch (err) {
      console.error(err);
      setError("Error applying promo code");
    }
  };

  return (
    <div>
      <h2>Cart</h2>
      <p>Total: ₹{cartTotal}</p>

      <input
        type="text"
        placeholder="Enter Promo Code"
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
      />
      <button onClick={applyPromo}>Apply</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {discount > 0 && <p style={{ color: "green" }}>Discount Applied: ₹{discount}</p>}
      <p>Final Total: ₹{cartTotal - discount}</p>
    </div>
  );
}