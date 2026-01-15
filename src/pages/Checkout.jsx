import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Mail } from "lucide-react";

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const deliveryCharge = 30;
  const codCharge = 20;
  const itemsTotal = cart.reduce((a, b) => a + b.price * b.qty, 0);
  const totalAmount = itemsTotal + deliveryCharge + codCharge - discount;

  // 📍 Get Current Location
  const handleLocation = () => {
    if (!navigator.geolocation) {
      alert("Location not supported");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        // Simple auto-fill (exact address API baad me add kar sakte)
        setAddress(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
        setLoadingLocation(false);
      },
      () => {
        alert("Location permission denied");
        setLoadingLocation(false);
      }
    );
  };

  // 🎟 Promo Code
  const applyPromo = () => {
    const code = promoCode.trim().toLowerCase();

    if (promoApplied) return;

    if (code === "free30") {
      setDiscount(30);
      setPromoApplied(true);
    } else if (code === "save50") {
      setDiscount(50);
      setPromoApplied(true);
    } else {
      alert("Invalid Promo Code");
    }
  };

  const handleSubmit = () => {
    if (!phone && !email) {
      alert("Enter phone OR verify email");
      return;
    }

    if (!address) {
      alert("Please enter delivery address");
      return;
    }

    navigate("/payment-options", {
      state: {
        phone,
        email,
        address,
        cart,
        itemsTotal,
        deliveryCharge,
        codCharge,
        discount,
        totalAmount,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-28">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center gap-3 shadow-sm">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <h2 className="text-lg font-semibold">Checkout</h2>
      </div>

      <div className="p-4 space-y-6">
        {/* Delivery Location */}
        <div className="bg-white rounded-xl p-4 space-y-3">
          <h3 className="font-semibold">Delivery Location</h3>

          <button
            onClick={handleLocation}
            className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg font-medium"
          >
            <MapPin size={18} />
            {loadingLocation ? "Fetching location..." : "Use My Current Location"}
          </button>

          <input
            type="text"
            placeholder="House / Flat No., Landmark"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Phone */}
        <div className="bg-white rounded-xl p-4 space-y-3">
          <h3 className="font-semibold">Phone Number</h3>
          <input
            type="tel"
            placeholder="Mobile Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Email / Gmail */}
        <div className="bg-white rounded-xl p-4 space-y-3">
          <h3 className="font-semibold">Email (Optional)</h3>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border rounded-lg p-3"
            />
            <button className="px-4 bg-gray-800 text-white rounded-lg flex items-center gap-1">
              <Mail size={16} /> Gmail
            </button>
          </div>
        </div>

        {/* Promo Code */}
        <div className="bg-white rounded-xl p-4 space-y-3">
          <h3 className="font-semibold">Promo Code</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              disabled={promoApplied}
              className="flex-1 border rounded-lg p-3"
            />
            <button
              onClick={applyPromo}
              disabled={promoApplied}
              className="px-4 bg-green-600 text-white rounded-lg"
            >
              {promoApplied ? "Applied" : "Apply"}
            </button>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-white rounded-xl p-4 space-y-3">
          <h3 className="font-semibold">Payment Method</h3>
          <div className="border rounded-lg p-3 font-medium">
            💵 Cash on Delivery
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-white rounded-xl p-4 text-sm space-y-2">
          <div className="flex justify-between">
            <span>Items Total</span>
            <span>₹{itemsTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charge</span>
            <span>₹{deliveryCharge}</span>
          </div>
          <div className="flex justify-between">
            <span>COD Charge</span>
            <span>₹{codCharge}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Promo Discount</span>
              <span>-₹{discount}</span>
            </div>
          )}
          <div className="flex justify-between font-semibold border-t pt-2">
            <span>Total Payable</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className={`w-full py-4 rounded-xl font-semibold text-white ${
            phone || email
              ? "bg-gray-900"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continue & Pay ₹{totalAmount}
        </button>
      </div>
    </div>
  );
};

export default Checkout;