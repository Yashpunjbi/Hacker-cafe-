import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify";

const Menu = () => {
  const { addToCart } = useCart();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products = [];
        querySnapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data(), qty: 1 });
        });
        setItems(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchItems();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success("🛒 Item added to cart!");
  };

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto text-gray-800">
      {/* 👇 Hero Section */}
      <section className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-2">
          🍕 Hacker Cafe Menu
        </h1>
        <p className="text-gray-600 text-lg">
          Fresh. Fast. Delicious. Delivered with ❤️
        </p>
      </section>

      {/* 👇 Features */}
      <section className="grid md:grid-cols-3 gap-4 text-sm mb-10">
        <div className="bg-pink-50 p-4 rounded-lg text-center shadow">
          🚚 <strong>Fast Delivery</strong><br />
          Get your order in under 30 minutes!
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center shadow">
          🥗 <strong>Fresh Food</strong><br />
          Always cooked fresh, never pre-made!
        </div>
        <div className="bg-blue-50 p-4 rounded-lg text-center shadow">
          🆓 <strong>Free Delivery</strong><br />
          For orders above ₹100
        </div>
      </section>

      {/* 👇 Menu Grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Regular Menu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-4 flex flex-col transition hover:shadow-pink-300"
            >
              <img
                src={item.image}
                alt={item.name}
                className="rounded-xl object-cover h-40 w-full mb-4"
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-pink-600 font-bold text-md">₹{item.price}</p>
              <button
                onClick={() => handleAddToCart(item)}
                className="mt-4 bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Menu;