import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // 🔥 apna firebase config path

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  const itemsTotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // ✅ delivery charge ONLY after location
  const deliveryCharge = address ? 30 : 0;

  const totalAmount = itemsTotal + deliveryCharge - discount;

  // 📍 LIVE LOCATION → FULL ADDRESS
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Location not supported");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          setAddress(
            `${data.display_name} (Lat:${latitude}, Lng:${longitude})`
          );
        } catch {
          alert("Failed to fetch address");
        } finally {
          setLoadingLocation(false);
        }
      },
      () => {
        alert("Location permission denied");
        setLoadingLocation(false);
      }
    );
  };

  // 🎟 PROMO FROM FIREBASE
  const applyPromo = async () => {
    if (!promo) return alert("Enter promo code");

    const snap = await getDocs(collection(db, "promoCodes"));
    let found = false;

    snap.forEach((doc) => {
      const data = doc.data();
      if (
        data.code.toLowerCase() === promo.toLowerCase() &&
        data.active
      ) {
        setDiscount(data.discount);
        found = true;
      }
    });

    if (found) {
      alert("Promo applied successfully");
    } else {
      alert("Invalid or expired promo code");
      setDiscount(0);
    }
  };

  const handlePlaceOrder = () => {
    if (!phone || !address || cart.length === 0) {
      alert("Please fill all required details");
      return;
    }

    navigate("/payment-options", {
      state: {
        phone,
        email,
        address,
        coords,
        cart,
        itemsTotal,
        deliveryCharge,
        discount,
        totalAmount,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      {/* 📍 DELIVERY LOCATION */}
      <div className="bg-white p-4 rounded-xl mb-4">
        <p className="font-semibold mb-2">Delivery Location</p>

        <button
          type="button"
          onClick={getCurrentLocation}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mb-3"
        >
          {loadingLocation ? "Fetching location..." : "Use My Current Location"}
        </button>

        <textarea
          className="w-full border rounded-lg p-2 text-sm"
          rows="3"
          placeholder="Full delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* 📞 PHONE */}
      <div className="bg-white p-4 rounded-xl mb-4">
        <p className="font-semibold mb-2">Phone Number</p>
        <input
          type="tel"
          className="w-full border rounded-lg p-2"
          placeholder="Mobile Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {/* 📧 EMAIL */}
      <div className="bg-white p-4 rounded-xl mb-4">
        <p className="font-semibold mb-2">Email (Optional)</p>
        <input
          type="email"
          className="w-full border rounded-lg p-2"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      {/* 🎟 PROMO */}
      <div className="bg-white p-4 rounded-xl mb-4">
        <p className="font-semibold mb-2">Promo Code</p>
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded-lg p-2"
            placeholder="Enter promo code"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
          />
          <button
            onClick={applyPromo}
            className="bg-green-600 text-white px-4 rounded-lg"
          >
            Apply
          </button>
        </div>
      </div>

      {/* 💰 SUMMARY */}
      <div className="bg-white p-4 rounded-xl mb-6 text-sm">
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
            <span>-₹{discount}</span>
          </div>
        )}
        <div className="flex justify-between font-bold border-t pt-2 mt-2">
          <span>Total Payable</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;