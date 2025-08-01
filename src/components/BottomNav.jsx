import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaTags, FaShoppingCart, FaUser } from "react-icons/fa";
import { getAuth, signOut } from "firebase/auth";

const BottomNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Hide dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigate("/");
      setShowDropdown(false);
    });
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow z-50">
      <div className="flex justify-around items-center py-2 relative">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs transition-all duration-300 ${
              isActive ? "text-red-500 scale-110" : "text-gray-500"
            }`
          }
        >
          <FaHome size={22} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/offers"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs transition-all duration-300 ${
              isActive ? "text-red-500 scale-110" : "text-gray-500"
            }`
          }
        >
          <FaTags size={22} />
          <span>Offers</span>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `flex flex-col items-center text-xs transition-all duration-300 ${
              isActive ? "text-red-500 scale-110" : "text-gray-500"
            }`
          }
        >
          <FaShoppingCart size={22} />
          <span>Cart</span>
        </NavLink>

        {/* Profile + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className={`flex flex-col items-center text-xs transition-all duration-300 ${
              showDropdown ? "text-red-500 scale-110" : "text-gray-500"
            }`}
          >
            <FaUser size={22} />
            <span>Profile</span>
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute bottom-12 right-0 bg-white border rounded shadow-md w-40 text-sm z-50">
              <button
                onClick={() => {
                  navigate("/orders");
                  setShowDropdown(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Order History
              </button>
              <button
                onClick={() => {
                  navigate("/track");
                  setShowDropdown(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Track Order
              </button>
              <button
                onClick={() => {
                  navigate("/contact");
                  setShowDropdown(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Contact Us
              </button>
              <button
                onClick={() => {
                  navigate("/terms");
                  setShowDropdown(false);
                }}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Terms & Conditions
              </button>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left hover:bg-red-100 text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default BottomNavbar;