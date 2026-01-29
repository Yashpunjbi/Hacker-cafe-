import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "banners"), (snap) => {
      setBanners(snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })));
    });
    return () => unsub();
  }, []);

  return (
    <div className="w-full overflow-x-auto whitespace-nowrap scrollbar-hide py-2">
      {banners.map((banner, i) => (
        <img
          key={banner.id}
          src={banner.image}   // ✅ FIXED
          alt={banner.title || `Banner ${i}`}
          className="inline-block w-[90%] h-[200px] md:h-[300px] object-cover rounded-xl mx-2 shadow-md"
        />
      ))}
    </div>
  );
};

export default Banner;