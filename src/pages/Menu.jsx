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
    toast.success("🛒 Item added to cart!", { autoClose: 1500 });
  };

  const handleQtyChange = (id, delta) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: Math.max(1, item.qty + delta),
            }
          : item
      )
    );
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
        🍕 Hacker Cafe Menu
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-xl shadow-md p-4 flex flex-col justify-between transition duration-300 hover:shadow-pink-300 ${
              item.stock === false ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            <div>
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-44 object-cover rounded mb-3"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-gray-600 mb-1">₹{item.price}</p>
              {item.stock === false && (
                <p className="text-red-500 font-semibold">Out of Stock</p>
              )}
            </div>

            {item.stock !== false && (
              <>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQtyChange(item.id, -1)}
                      className="bg-gray-200 px-3 py-1 rounded text-xl"
                    >
                      -
                    </button>
                    <span className="text-lg font-medium">{item.qty}</span>
                    <button
                      onClick={() => handleQtyChange(item.id, 1)}
                      className="bg-gray-200 px-3 py-1 rounded text-xl"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-pink-600 text-white py-1 px-4 rounded hover:bg-pink-700 transition text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;