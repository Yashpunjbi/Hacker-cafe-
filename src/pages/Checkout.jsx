import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Checkout</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter your name"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter your address"
          ></textarea>
        </div>

        {/* Landmark */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Landmark</label>
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Nearby landmark"
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter your city"
          />
        </div>

        {/* Pincode */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="Enter pincode"
          />
        </div>

        {/* Continue to Payment Button */}
        <button
          type="button"
          onClick={() => navigate("/payment-options", { state: { formData } })}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white p-2 rounded mt-4 transition duration-200"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

export default Checkout;