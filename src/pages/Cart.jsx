import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQty } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-pink-600">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow flex flex-col sm:flex-row gap-4 p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-28 h-28 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">₹{item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-xl"
                      title="Remove item"
                    >
                      ❌
                    </button>
                  </div>

                  <div className="flex items-center mt-3 gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg"
                    >
                      −
                    </button>
                    <span className="text-md font-medium">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-4 text-right">
            <h3 className="text-xl font-bold mb-2">Total: ₹{total}</h3>
            <Link
              to="/checkout"
              className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 py-2 rounded-lg transition"
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