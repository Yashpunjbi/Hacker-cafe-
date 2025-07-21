import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQty } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-pink-600">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="bg-white p-4 rounded-lg shadow flex items-center gap-4"
              >
                <img src={item.image} className="w-20 h-20 rounded" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">₹{item.price}</p>
                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right">
            <h3 className="text-lg font-bold">Total: ₹{total}</h3>
            <Link
              to="/checkout"
              className="inline-block mt-4 bg-pink-600 text-white px-4 py-2 rounded"
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