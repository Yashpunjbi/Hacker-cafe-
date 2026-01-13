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

  useEffect(() => {
    const unsubBanner = onSnapshot(collection(db, "banners"), (snapshot) => {
      setBanners(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    const unsubCategories = onSnapshot(collection(db, "categories"), (snapshot) => {
      setCategories(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    const unsubProducts = onSnapshot(collection(db, "products"), (snapshot) => {
      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

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

  return (
    <div className="min-h-screen bg-white">

      {/* 🔥 ZOMATO STYLE BANNER (HALF SCREEN) */}
      {banners.length > 0 && (
        <div className="relative w-full h-[50vh] md:h-[55vh] mb-10">
          <img
            src={banners[0].image}
            alt="Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-3xl md:text-5xl font-extrabold">
                Bakchodi Kitchen
              </h1>
              <p className="mt-2 text-sm md:text-lg opacity-90">
                Taste jo baar-baar yaad aaye 😋
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 CATEGORIES */}
      {categories.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 mb-10">
          <h2 className="text-2xl font-bold text-red-500 mb-4">
            What’s on your mind?
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <Link to={`/category/${cat.name}`} key={cat.id}>
                <div className="min-w-[110px] bg-white border border-red-100 rounded-2xl p-3 text-center shadow-sm hover:shadow-md transition">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-16 h-16 mx-auto rounded-full object-cover mb-2"
                  />
                  <p className="text-sm font-semibold text-gray-700">
                    {cat.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 🔥 PRODUCTS */}
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-red-500 mb-8">
          Popular Items 🍕
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            No items available right now.
          </p>
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
                  <h3 className="text-lg font-bold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-extrabold text-red-500">
                      ₹{item.price}
                    </span>

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