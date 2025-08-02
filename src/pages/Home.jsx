import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsubscribeBanner = onSnapshot(collection(db, "banners"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBanners(data);
    });

    const unsubscribeCat = onSnapshot(collection(db, "categories"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCategories(data);
    });

    return () => {
      unsubscribeBanner();
      unsubscribeCat();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Top Banner */}
      {banners.length > 0 && (
        <div className="w-full">
          <img
            src={banners[0].image}
            alt="Top Banner"
            className="w-full h-[180px] object-cover"
          />
        </div>
      )}

      {/* Categories Grid */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">
          What are you craving for?
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 justify-items-center">
          {categories.map((item) => (
            <a
              href={item.link}
              key={item.id}
              className="flex flex-col items-center"
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-20 h-20 rounded-full object-cover border shadow"
              />
              <span className="text-sm mt-2">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;