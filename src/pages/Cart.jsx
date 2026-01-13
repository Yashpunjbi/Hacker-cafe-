import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQty } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-white px-4 pt-6 pb-28 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-red-500">
        Your Cart
      </h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          Your cart is empty.
        </p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-red-100 rounded-xl shadow-sm flex gap-4 p-3"
              >
                {/* Image (smaller & side) */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                {/* Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-md font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        ₹{item.price}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-8 h-8 rounded-full border border-red-200 text-red-500 hover:bg-red-50"
                    >
                      −
                    </button>

                    <span className="font-medium">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-8 h-8 rounded-full border border-red-200 text-red-500 hover:bg-red-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total & Checkout */}
          <div className="mt-8 border-t pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-700">
                Total
              </span>
              <span className="text-xl font-bold text-red-500">
                ₹{total}
              </span>
            </div>

            <Link
              to="/checkout"
              className="block text-center bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;