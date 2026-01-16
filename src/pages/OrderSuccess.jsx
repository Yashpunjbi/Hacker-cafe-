import React from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle, Phone, Mail, MapPin, CreditCard } from "lucide-react";

export default function OrderSuccess() {
  const location = useLocation();
  const {
    orderId,
    amount,
    method,
    name,
    address,
    phone,
    email,
    items = [],
  } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Success Header */}
        <div className="bg-green-600 text-white p-6 flex flex-col items-center">
          <CheckCircle size={64} />
          <h1 className="text-2xl font-bold mt-2">Order Placed 🎉</h1>
          <p className="text-sm opacity-90 mt-1">
            Your food is being prepared
          </p>
        </div>

        {/* Order Details */}
        <div className="p-5 space-y-4">

          {/* Order ID */}
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Order ID</span>
            <span className="font-semibold">{orderId}</span>
          </div>

          {/* Customer Info */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
            <p className="font-semibold">{name}</p>

            <p className="flex items-start gap-2 text-gray-600">
              <MapPin size={16} className="mt-0.5" />
              {address}
            </p>

            <p className="flex items-center gap-2 text-gray-600">
              <Phone size={16} /> {phone}
            </p>

            <p className="flex items-center gap-2 text-gray-600">
              <Mail size={16} /> {email}
            </p>
          </div>

          {/* Items */}
          {items.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Items Ordered</h3>
              <div className="space-y-2 text-sm">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b pb-1"
                  >
                    <span>
                      {item.name} × {item.qty}
                    </span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Summary */}
          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between font-semibold text-base">
              <span>Total Paid</span>
              <span className="text-green-600">₹{amount}</span>
            </div>

            <p className="flex items-center gap-2 text-gray-600">
              <CreditCard size={16} /> Payment Method: {method}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4">
          <Link
            to="/"
            className="block text-center bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}