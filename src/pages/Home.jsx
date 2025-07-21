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
    <div className="p-4 mb-16">
      <h2 className="text-xl font-bold mb-4 text-center text-pink-600">
        Welcome to Bakchodi Kitchen!
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow p-4 text-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;