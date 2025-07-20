import React from "react";

const deals = [
  {
    title: "₹29 Cheesy Pizza",
    image: "https://source.unsplash.com/400x300/?cheese-pizza",
    desc: "Hot & cheesy pizza at just ₹29! Limited Time Offer.",
  },
  {
    title: "₹9 Cold Drink",
    image: "https://source.unsplash.com/400x300/?cold-drinks",
    desc: "Refresh yourself for just ₹9. Grab the deal now!",
  },
  {
    title: "Combo Deal",
    image: "https://source.unsplash.com/400x300/?combo-food",
    desc: "Pizza + Drink Combo for just ₹35!",
  },
];

const Offers = () => {
  return (
    <div className="p-4 mb-16">
      <h2 className="text-xl font-bold mb-4 text-center text-yellow-600">🎁 Special Offers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {deals.map((offer, idx) => (
          <div key={idx} className="bg-white rounded shadow p-2">
            <img src={offer.image} alt={offer.title} className="w-full h-40 object-cover rounded" />
            <h3 className="text-lg font-semibold mt-2">{offer.title}</h3>
            <p className="text-gray-600 text-sm">{offer.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;

