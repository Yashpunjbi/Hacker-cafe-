import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "../context/CartContext";

const Home = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      const menuSnapshot = await getDocs(collection(db, "products"));
      const menuList = menuSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenuItems(menuList);
    };

    const fetchCategories = async () => {
      const catSnapshot = await getDocs(collection(db, "categories"));
      const catList = catSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(catList);
    };

    fetchMenu();
    fetchCategories();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Welcome to Hacker Cafe</h1>

      {/* 🔸 Category Scroller */}
      <div className="flex overflow-x-auto gap-4 pb-2 mb-6">
        {categories.map((cat) => (
          <Link to={`/category/${cat.name}`} key={cat.id}>
            <div className="min-w-[120px] bg-white shadow rounded-xl p-3 text-center hover:scale-105 transition">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-16 h-16 object-cover mx-auto rounded-full mb-2"
              />
              <p className="text-sm font-medium">{cat.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* 🔸 Menu Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {menuItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow p-3">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-24 object-cover rounded-md mb-2"
            />
            <h3 className="text-sm font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-500 mb-2">₹{item.price}</p>
            <button
              onClick={() => addToCart(item)}
              className="text-xs px-2 py-1 bg-black text-white rounded hover:bg-gray-800"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;