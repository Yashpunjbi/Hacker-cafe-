import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-toastify"; // ✅ toast import

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

  // ✅ handle cart + show toast
  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success("🛒 Item added to cart!");
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
        Hacker cafe Menu 🍕
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
              onClick={() => handleAddToCart(item)} // ✅ updated here
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