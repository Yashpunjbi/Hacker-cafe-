import React from "react";

const categories = [
  {
    id: 1,
    title: "Pizzas @ ₹169",
    image: "https://cdn-icons-png.flaticon.com/512/3132/3132693.png",
  },
  {
    id: 2,
    title: "5 Course Meal",
    image: "https://cdn-icons-png.flaticon.com/512/2718/2718224.png",
  },
  {
    id: 3,
    title: "Sandwich",
    image: "https://cdn-icons-png.flaticon.com/512/5787/5787079.png",
  },
  {
    id: 4,
    title: "Thali",
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
  },
  {
    id: 5,
    title: "Beverages",
    image: "https://cdn-icons-png.flaticon.com/512/135/135620.png",
  },
];

const Home = () => {
  return (
    <div className="px-4">
      {/* Banner */}
      <div className="bg-gradient-to-r from-pink-500 to-yellow-400 rounded-xl shadow-md p-6 text-white mb-6">
        <h1 className="text-2xl font-bold mb-2">🔥 Flat 50% OFF on Combos!</h1>
        <p>Order now and enjoy tasty savings.</p>
      </div>

      {/* Categories */}
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Shop by Category</h2>
      <div className="grid grid-cols-3 gap-4 mb-10">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white shadow rounded-xl flex flex-col items-center justify-center p-4 transition hover:scale-105 hover:shadow-lg"
          >
            <img src={cat.image} alt={cat.title} className="w-16 h-16 mb-2" />
            <p className="text-sm font-medium text-gray-800 text-center">{cat.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;