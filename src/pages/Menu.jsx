import React from "react";
import { useCart } from "../context/CartContext";

const Menu = () => {
  const { addToCart } = useCart();

  const items = [
    {
      id: 1,
      name: "Cheese Pizza",
      price: 29,
      qty: 1,
      image: "https://source.unsplash.com/400x300/?cheese-pizza",
    },
    {
      id: 2,
      name: "Veg Sandwich",
      price: 29,
      qty: 1,
      image: "https://source.unsplash.com/400x300/?sandwich",
    },
    {
      id: 3,
      name: "Cold Drink",
      price: 9,
      qty: 1,
      image: "https://source.unsplash.com/400x300/?cold-drink",
    },
    {
      id: 4,
      name: "Burger",
      price: 39,
      qty: 1,
      image: "https://source.unsplash.com/400x300/?burger",
    },
    {
      id: 5,
      name: "Pasta",
      price: 49,
      qty: 1,
      image: "https://source.unsplash.com/400x300/?pasta",
    },
    {
      id: 6,
      name: "Fries",
      price: 19,
      qty: 1,
      image: "https://source.unsplash.com/400x300/?fries",
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
        Bakchodi Kitchen Menu 🍕
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between hover:shadow-pink-300 transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
            <p className="text-gray-600 mb-4">₹{item.price}</p>
            <button
              onClick={() => addToCart(item)}
              className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
