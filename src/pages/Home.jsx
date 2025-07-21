import React from "react";

const menuItems = [
  {
    id: 1,
    name: "Cheesy Pizza",
    price: 29,
    image: "https://source.unsplash.com/400x300/?pizza",
  },
  {
    id: 2,
    name: "Masala Sandwich",
    price: 29,
    image: "https://source.unsplash.com/400x300/?sandwich",
  },
  {
    id: 3,
    name: "Cold Drink",
    price: 9,
    image: "https://source.unsplash.com/400x300/?cold-drink",
  },
];

const Home = () => {
  return (
    <div className="p-4 bg-gradient-to-br from-yellow-100 via-pink-50 to-red-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-pink-700 mb-6 underline decoration-pink-500">
        🍽️ Today’s Special @ ₹29
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-500 mt-1 mb-3">Only ₹{item.price}</p>
              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-md font-semibold transition">
                Order Now 🚀
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;