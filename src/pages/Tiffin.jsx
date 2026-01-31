import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const Tiffin = () => {
  const [tiffins, setTiffins] = useState([]);
  const [banners, setBanners] = useState([]);
  const { addToCart } = useCart();

  // Slider state
  const [currentBanner, setCurrentBanner] = useState(0);

  // 🔥 FETCH DATA
  useEffect(() => {
    // Tiffins
    const fetchTiffins = async () => {
      const snap = await getDocs(collection(db, "Tiffins"));
      setTiffins(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchTiffins();

    // Banners filtered for Tiffin page
    const unsubBanner = onSnapshot(collection(db, "banners"), (snap) => {
      const tiffinBanners = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((b) => b.page === "tiffin"); // 🧠 only Tiffin banners
      setBanners(tiffinBanners);
    });

    return () => unsubBanner();
  }, []);

  // 🔥 Auto slide effect
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000); // 4 seconds

    return () => clearInterval(interval);
  }, [banners]);

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success("Item added to cart 🛒");
  };

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">

      {/* 🔥 BANNER SLIDER */}
      {/* 🔥 BANNER SLIDER (FULL WIDTH – EDGE TO EDGE) */}
{banners.length > 0 && (
  <div className="relative w-screen h-[45vh] reminder:h-[50vh] overflow-hidden mb-6">
    <div
      className="flex h-full transition-transform duration-700 ease-in-out"
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
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
      {banners.map((_, i) => (
        <span
          key={i}
          className={`w-3 h-3 rounded-full ${
            currentBanner === i ? "bg-red-500" : "bg-white"
          }`}
        />
      ))}
    </div>
  </div>
)}
      )}

      {/* 🔥 Tiffin Items */}
      <div className="p-4">
  <h1 className="text-2xl font-bold mb-4 text-gray-800">
    🏫 School Tiffin Service
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
    {/* tiffin cards */}
  </div>
</div>
            key={t.id}
            className={`bg-white rounded-2xl shadow-md overflow-hidden ${
              !t.available ? "opacity-70" : ""
            }`}
          >
            {/* Image */}
            <div className="relative">
              <img
                src={t.image}
                alt={t.name}
                className="h-40 w-full object-cover"
              />

              {/* Stock Badge */}
              <span
                className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full ${
                  t.available
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {t.available ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Content */}
            <div className="p-3">
              <h2 className="font-semibold text-lg text-gray-800">{t.name}</h2>

              <p className="text-green-600 font-bold text-lg mt-1">₹{t.price}</p>

              <button
                disabled={!t.available}
                onClick={() => handleAddToCart(t)}
                className={`w-full mt-3 py-2 rounded-xl font-semibold transition ${
                  t.available
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {t.available ? "Add to Cart" : "Unavailable"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* bottom space for mobile navbar */}
      <div className="h-20"></div>
    </div>
  );
};

export default Tiffin;