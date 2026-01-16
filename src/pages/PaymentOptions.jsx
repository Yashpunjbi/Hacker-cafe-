import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Wallet, Smartphone, CheckCircle } from "lucide-react";

export default function PaymentOptions() {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const {
    name,
    address,
    phone,
    email,
    cart,
    itemsTotal,
    deliveryCharge,
    discount,
    totalAmount,
  } = location.state || {};

  const handlePlaceOrder = async () => {
    const user = auth.currentUser;
    const userId = user?.uid || localStorage.getItem("userId") || "guest";

    const orderData = {
      userId,
      name: name || user?.displayName || "Guest",
      email: user?.email || email || "Not provided",
      phone: phone || "Not provided",
      address: address || "Not provided",
      items: cart || [],
      itemsTotal,
      deliveryCharge,
      discount,
      amount: totalAmount,
      method: paymentMethod,
      createdAt: serverTimestamp(),
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), orderData);
      navigate("/order-success", {
        state: { ...orderData, orderId: docRef.id },
      });
      localStorage.removeItem("cartItems");
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-5">

        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <CheckCircle className="text-green-500" />
          Payment Method
        </h2>

        {/* COD */}
        <div
          onClick={() => setPaymentMethod("COD")}
          className={`border rounded-lg p-4 mb-3 cursor-pointer transition ${
            paymentMethod === "COD"
              ? "border-green-500 bg-green-50"
              : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <Wallet className="text-green-600" />
            <div>
              <p className="font-semibold">Cash on Delivery</p>
              <p className="text-xs text-gray-500">
                Pay when order arrives
              </p>
            </div>
          </div>
        </div>

        {/* UPI */}
        <div
          onClick={() => setPaymentMethod("PHONEPE")}
          className={`border rounded-lg p-4 cursor-pointer transition ${
            paymentMethod === "PHONEPE"
              ? "border-blue-500 bg-blue-50"
              : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <Smartphone className="text-blue-600" />
            <div>
              <p className="font-semibold">UPI / Google Pay / PhonePe</p>
              <p className="text-xs text-gray-500">
                Fast & secure payment
              </p>
            </div>
          </div>

          {paymentMethod === "PHONEPE" && (
            <div className="mt-3 border rounded-lg p-3 bg-white">
              <p className="text-sm">
                UPI ID: <strong>hacker@upi</strong>
              </p>
              <img
                src="/upi-qr.png"
                alt="UPI QR"
                className="w-32 mx-auto mt-2"
              />
            </div>
          )}
        </div>

        {/* Price Summary */}
<div className="mt-5 border-t pt-4 space-y-2 text-sm">

  <div className="flex justify-between">
    <span>Items Total</span>
    <span>₹{itemsTotal}</span>
  </div>

  <div className="flex justify-between">
    <span>Delivery Charge</span>
    <span>₹{deliveryCharge}</span>
  </div>

  {discount > 0 && (
    <div className="flex justify-between text-green-600">
      <span>Promo Discount</span>
      <span>- ₹{discount}</span>
    </div>
  )}

  <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
    <span>Total Payable</span>
    <span>₹{totalAmount}</span>
  </div>

</div>

          
        <button
          onClick={handlePlaceOrder}
          className="mt-5 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold text-lg"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}