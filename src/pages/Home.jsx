import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // 🔥 Fetch banners
    const unsubBanner = onSnapshot(collection(db, "banners"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBanners(data);
    });

    // 🔥 Fetch categories
    const unsubCategories = onSnapshot(collection(db, "categories"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategories(data);
    });

    // 🔥 Fetch products
    const unsubProducts = onSnapshot(collection(db, "products"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    });

    return () => {
      unsubBanner();
      unsubCategories();
      unsubProducts();
    };
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success("🛒 Item added to cart!");
  };

  return (
    <div className="min-h-screen bg-[#fff8f0] px-4 py-6">
      {/* 🔥 Banner Section */}
      {banners.length > 0 && (
        <div className="mb-6">
          {banners.map((banner) => (
            <img
              key={banner.id}
              src={banner.image}
              alt="Banner"
              className="w-full h-48 md:h-64 object-cover rounded-xl shadow"
            />
          ))}
        </div>
      )}

      {/* 🔥 Categories Section */}
      {categories.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-[#ff5733]">🍽️ Categories</h2>
          <div className="flex overflow-x-auto gap-4 pb-2">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="min-w-[120px] bg-white shadow rounded-xl p-3 text-center"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-16 h-16 object-cover mx-auto rounded-full mb-2"
                />
                <p className="text-sm font-medium">{cat.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 🔥 Products Section */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-[#ff5733] mb-8">
        🍕 Our Menu
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition"
          >
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
                  onClick={() => handleAddToCart(item)}
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