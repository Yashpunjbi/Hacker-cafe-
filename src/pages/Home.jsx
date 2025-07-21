import React from "react";

const menuItems = [
  {
    id: 1,
    name: "Cheesy Pizza",
    price: 29,
    image: "https://source.unsplash.com/400x300/?cheese-pizza",
  },
  {
    id: 2,
    name: "Masala Sandwich",
    price: 29,
    image: "https://source.unsplash.com/400x300/?grilled-sandwich",
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
    <div className="p-4 bg-gradient-to-b from-pink-50 to-white min-h-screen pb-20">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-pink-600 drop-shadow-md">
        🍕 Bakchodi Kitchen Deals 🍔
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-2">Tasty & Affordable</p>
              <span className="inline-block bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-semibold">
                ₹{item.price} Only
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;