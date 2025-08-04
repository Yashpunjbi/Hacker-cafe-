import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useCart } from "../context/CartContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    });

    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-[#fff8f0] px-4 py-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#ff5733] mb-8">
        🍽️ Our Menu
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {products.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-bold text-[#ff5733]">₹{item.price}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-[#ff5733] text-white px-3 py-1 rounded-full text-sm hover:bg-[#e74c3c] transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;