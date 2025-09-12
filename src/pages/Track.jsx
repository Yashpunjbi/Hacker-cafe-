import React, { useState } from "react";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");

  const handleTrack = () => {
    alert(`Tracking order with ID: ${orderId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Track Your Order</h2>
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
      <button
        onClick={handleTrack}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Track Order
      </button>
    </div>
  );
};

export default TrackOrder;