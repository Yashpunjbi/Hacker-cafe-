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
    <div className="px-4 py-8 min-h-screen bg-gradient-to-br from-pink-50 to-white">
      <h1 className="text-3xl font-extrabold text-center text-pink-600 mb-6 drop-shadow-sm">
        Welcome to Bakchodi Kitchen 🍕🥪🥤
      </h1>
      <p className="text-center text-gray-500 mb-10 text-lg">
        Trendy meals at unmatchable prices!
      </p>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 p-4 border border-pink-100"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
              <p className="text-pink-500 font-bold mt-1">₹{item.price} only</p>
              <button className="mt-4 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg transition-all duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;