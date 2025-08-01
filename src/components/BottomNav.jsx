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
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              to={item.path}
              key={item.path}
              className="flex flex-col items-center group relative"
            >
              <div
                className={`transition-all duration-300 ease-in-out p-2 rounded-full ${
                  isActive
                    ? "text-pink-600 scale-125 animate-bounce"
                    : "text-gray-500 dark:text-gray-300"
                }`}
              >
                <Icon size={22} />
              </div>
              <span
                className={`text-xs mt-1 transition-all duration-300 ${
                  isActive
                    ? "text-pink-600 font-semibold"
                    : "text-gray-500 dark:text-gray-300"
                }`}
              >
                {item.label}
              </span>

              {/* ✅ Animated bottom indicator bar */}
              {isActive && (
                <span className="absolute -bottom-[2px] left-1/2 transform -translate-x-1/2 w-5 h-[3px] rounded-full bg-pink-500 transition-all duration-300"></span>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavbar;