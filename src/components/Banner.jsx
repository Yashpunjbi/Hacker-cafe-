import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [index, setIndex] = useState(0);

  // 🔥 FETCH BANNERS
  useEffect(() => {
    const q = query(
      collection(db, "banners"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setBanners(
        snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, []);

  // 🔄 AUTO SLIDE
  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 3500); // ⏱️ 3.5 sec

    return () => clearInterval(timer);
  }, [banners]);

  if (!banners.length) return null;

  const current = banners[index];
  const heightClass =
    current.type === "full"
      ? "h-[220px] md:h-[320px]"
      : "h-[150px] md:h-[220px]";

  return (
    <div className="w-full px-3">
      {/* BANNER */}
      <div className="relative overflow-hidden rounded-2xl shadow-lg">
        <img
          src={current.image}
          alt={current.title}
          className={`w-full ${heightClass} object-cover transition-all duration-700`}
        />

        {/* TITLE OVERLAY */}
        {current.title && (
          <div className="absolute bottom-3 left-3 bg-black/50 text-white px-3 py-1 rounded-lg text-sm font-semibold">
            {current.title}
          </div>
        )}
      </div>

      {/* DOTS */}
      <div className="flex justify-center mt-2 gap-2">
        {banners.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full cursor-pointer transition ${
              i === index
                ? "bg-orange-500 scale-125"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;