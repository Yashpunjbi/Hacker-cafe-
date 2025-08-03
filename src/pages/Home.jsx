// src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [bannerUrl, setBannerUrl] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchBanner = async () => {
      const querySnapshot = await getDocs(collection(db, "banner"));
      querySnapshot.forEach((doc) => {
        setBannerUrl(doc.data().image); // assume field is "image"
      });
    };

    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const cats = [];
      querySnapshot.forEach((doc) => {
        cats.push({ id: doc.id, ...doc.data() }); // id, title, image
      });
      setCategories(cats);
    };

    fetchBanner();
    fetchCategories();
  }, []);

  return (
    <div className="px-4 pt-4 pb-20">
      {/* Banner */}
      {bannerUrl && (
        <div className="mb-6">
          <img
            src={bannerUrl}
            alt="Banner"
            className="w-full rounded-xl shadow-md"
          />
        </div>
      )}

      {/* Categories */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Browse Categories</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col items-center bg-white shadow rounded-xl p-2 hover:scale-105 transition"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-16 h-16 rounded-full object-cover mb-2"
            />
            <p className="text-sm font-semibold text-gray-700 text-center">{cat.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;