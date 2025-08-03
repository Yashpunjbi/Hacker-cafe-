// src/components/Banner.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "banners"), (snap) => {
      setBanners(snap.docs.map((doc) => doc.data()));
    });
    return unsub;
  }, []);

  return (
    <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide py-2">
      {banners.map((banner, i) => (
        <img
          key={i}
          src={banner.imageUrl}
          alt={banner.title || `Banner ${i}`}
          className="inline-block w-[90%] rounded-xl mx-2"
        />
      ))}
    </div>
  );
};

export default Banner;