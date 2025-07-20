import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Offers", path: "/offers", icon: "🎁" },
    { name: "Cart", path: "/cart", icon: "🛒" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-2 z-50">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center text-sm ${
            pathname === item.path ? "text-pink-600 font-bold" : "text-gray-500"
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
