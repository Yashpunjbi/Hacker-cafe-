import React, { useState } from "react";
import pizzaImg from "../assets/pizza.png";
import comboImg from "../assets/combo.png";
import burgerImg from "../assets/burger.png";
import friesImg from "../assets/fries.png";
import coldDrinkImg from "../assets/drink.png";

const categories = [
  { name: "Pizza @ ₹169", image: pizzaImg, items: ["Cheese Pizza", "Paneer Pizza"] },
  { name: "5 Course Meal", image: comboImg, items: ["Thali", "Combo Rice"] },
  { name: "Burgers", image: burgerImg, items: ["Aloo Tikki", "Veggie Delight"] },
  { name: "Fries", image: friesImg, items: ["Masala Fries", "Peri Peri Fries"] },
  { name: "Cold Drinks", image: coldDrinkImg, items: ["Coke", "Sprite"] },
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="p-4 pb-24">
      {/* 🟣 Hero Banner */}
      <div className="bg-pink-100 rounded-xl p-6 mb-6 text-center shadow-md">
        <h2 className="text-2xl font-bold text-pink-700">🔥 Hacker Cafe Offers of the Day!</h2>
        <p className="text-gray-700 mt-2">Order now and enjoy 20% off on your first meal.</p>
      </div>

      {/* 🟢 Category Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setSelectedCategory(cat)}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-20 h-20 object-cover rounded-full border-4 border-pink-400 hover:scale-110 transition"
            />
            <p className="text-sm text-center mt-2 font-semibold text-gray-700">
              {cat.name}
            </p>
          </div>
        ))}
      </div>

      {/* 🔵 Selected Category Items */}
      {selectedCategory && (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-xl font-bold text-pink-600 mb-4">{selectedCategory.name}</h3>
          <ul className="space-y-2">
            {selectedCategory.items.map((item, i) => (
              <li key={i} className="p-3 bg-pink-50 rounded shadow text-gray-800">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;