import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const { addToCart } = useCart();

  // Slider state
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const unsubBanner = onSnapshot(collection(db, "banners"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBanners(data);
    });

    const unsubCategories = onSnapshot(
      collection(db, "categories"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(data);
      }
    );

    const unsubProducts = onSnapshot(collection(db, "products"), (snapshot) => {
      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sirf "home" category wale products
      const homeProducts = allProducts.filter((item) =>
        item.category?.toLowerCase().includes("home")
      );

      setProducts(homeProducts);
    });

    return () => {
      unsubBanner();
      unsubCategories();
      unsubProducts();
    };
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success("Item added to cart 🛒");
  };

  // 🔥 Auto slide effect
  useEffect(() => {
    if (banners.length <= 1) return; // sirf 1 banner ho to slide ki zarurat nahi
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [banners]);

  return (
    <div className="min-h-screen bg-white">

      {/* 🔥 BANNERS SLIDER */}
      {banners.length > 0 && (
        <div className="relative w-full h-[50vh] md:h-[55vh] overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{ transform: `translateX(-${currentBanner * 100}%)` }}
          >
            {banners.map((b) => (
              <div key={b.id} className="min-w-full h-full">
                <img
                  src={b.image}
                  alt={b.title || "Banner"}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
            {banners.map((_, i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full ${
                  currentBanner === i ? "bg-red-500" : "bg-white"
                } border border-gray-300`}
              ></span>
            ))}
          </div>
        </div>
      )}

      {/* 🔥 CATEGORIES */}
      {categories.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mt-10 mb-12">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Categories</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Link to={`/category/${cat.name}`} key={cat.id}>
                <div className="min-w-[110px] bg-white border border-red-100 rounded-2xl p-3 text-center shadow-sm hover:shadow-md transition">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-16 h-16 mx-auto rounded-full object-cover mb-2"
                  />
                  <p className="text-sm font-semibold text-gray-700">{cat.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 🔥 PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold text-center text-red-500 mb-8">
          Popular Items
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">No items available right now.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-red-100 shadow-sm hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-44 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-extrabold text-red-500">₹{item.price}</span>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-red-500 text-white px-4 py-1.5 rounded-full text-sm hover:bg-red-600 transition"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="h-20"></div>
    </div>
  );
};

export default Home;