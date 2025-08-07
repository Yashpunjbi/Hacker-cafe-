// src/pages/CategoryMenu.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const CategoryMenu = () => {
  const { categoryName } = useParams();
  const [items, setItems] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchItems = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const allProducts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filtered = allProducts.filter(
        (item) =>
          item.category?.toLowerCase().trim() === categoryName.toLowerCase().trim()
      );
      setItems(filtered);
    };

    fetchItems();
  }, [categoryName]);

  const handleAddToCart = (item) => {
    if (!item.inStock) {
      toast.error("This item is out of stock!");
      return;
    }

    addToCart(item);
    toast.success("Item added to cart!");
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold capitalize mb-4">{categoryName}</h2>

      {items.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl shadow p-3 text-center bg-white"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold">{item.name}</h3>
              <p className="text-lg font-bold text-[#ff5722]">₹{item.price}</p>
              <p className="text-sm text-gray-600 mt-1">
                {item.inStock ? "In Stock ✅" : "Out of Stock ❌"}
              </p>

              <button
                onClick={() => handleAddToCart(item)}
                disabled={!item.inStock}
                className={`mt-3 w-full py-2 px-4 rounded text-white transition ${
                  item.inStock
                    ? "bg-[#ff5722] hover:bg-[#e64a19]"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryMenu;