import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaHome, FaTags, FaShoppingCart, FaUser } from "react-icons/fa";

const BottomNavbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: FaHome },
    { path: "/offers", label: "Offers", icon: FaTags },
    { path: "/cart", label: "Cart", icon: FaShoppingCart },
    { path: "/orders", label: "Profile", icon: FaUser },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-inner z-50">
      <div className="flex justify-around py-2 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <NavLink
              to={item.path}
              key={item.path}
              className="flex flex-col items-center text-xs text-gray-500 dark:text-gray-300 transition-all duration-200"
            >
              <div
                className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                  isActive ? "bg-gradient-to-tr from-pink-500 to-yellow-400 text-white scale-110" : ""
                }`}
              >
                <Icon className="text-xl" />
                {isActive && (
                  <span className="absolute -bottom-1 w-2 h-2 bg-yellow-400 rounded-full shadow-md animate-ping" />
                )}
              </div>
              <span className={`mt-1 font-medium ${isActive ? "text-black dark:text-white font-semibold" : ""}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavbar;