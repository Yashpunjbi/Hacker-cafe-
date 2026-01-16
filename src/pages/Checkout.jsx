import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const GOOGLE_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"; // 🔑 Tu baad me dalega

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [coords, setCoords] = useState(null);
  const [showMap, setShowMap] = useState(false);

  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  const itemsTotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const deliveryCharge = coords ? 30 : 0;
  const totalAmount = itemsTotal + deliveryCharge - discount;

  // 📍 CURRENT LOCATION → MAP OPEN
  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Location not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setShowMap(true);
      },
      () => alert("Location permission denied")
    );
  };

  // 🎟 PROMO
  const applyPromo = async () => {
    if (!promo) return alert("Enter promo code");

    const snap = await getDocs(collection(db, "promoCodes"));
    let found = false;

    snap.forEach((doc) => {
      const data = doc.data();
      if (data.code.toLowerCase() === promo.toLowerCase() && data.active) {
        setDiscount(data.discount);
        found = true;
      }
    });

    if (!found) {
      alert("Invalid promo code");
      setDiscount(0);
    }
  };

  const handlePlaceOrder = () => {
    if (!name || !phone || !address || !coords) {
      alert("Fill all required details");
      return;
    }

    navigate("/payment-options", {
      state: {
        name,
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

      {/* 👤 NAME */}
      <div className="bg-white p-4 rounded-xl mb-4">
        <p className="font-semibold mb-2">Full Name</p>
        <input
          className="w-full border rounded-lg p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
        />
      </div>

      {/* 📍 LOCATION */}
      <div className="bg-white p-4 rounded-xl mb-4">
        <p className="font-semibold mb-2">Delivery Location</p>

        <button
          onClick={useCurrentLocation}
          className="w-full bg-blue-600 text-white py-2 rounded-lg mb-3"
        >
          ✓ Use My Current Location
        </button>

        {/* 🗺 MAP (IMAGE JAISA) */}
        {showMap && coords && (
          <div className="h-56 rounded-xl overflow-hidden border mb-3">
            <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
              <GoogleMap
                center={coords}
                zoom={15}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                onClick={(e) =>
                  setCoords({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  })
                }
              >
                <Marker position={coords} draggable />
              </GoogleMap>
            </LoadScript>
          </div>
        )}

        <textarea
          className="w-full border rounded-lg p-2 text-sm"
          placeholder="Full delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      {/* 📞 PHONE */}
      <div className="bg-white p-4 rounded-xl mb-4">
        <p className="font-semibold mb-2">Phone Number</p>
        <input
          className="w-full border rounded-lg p-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Mobile Number"
        />
      </div>

      {/* 📧 EMAIL */}
      <div className="bg-white p-4 rounded-xl mb-4">
        <p className="font-semibold mb-2">Email (Optional)</p>
        <input
          className="w-full border rounded-lg p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@gmail.com"
        />
      </div>

      {/* 🎟 PROMO */}
      <div className="bg-white p-4 rounded-xl mb-4">
        <p className="font-semibold mb-2">Promo Code</p>
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded-lg p-2"
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