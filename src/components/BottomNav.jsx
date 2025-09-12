import React from "react";
import { useNavigate } from "react-router-dom";

const BottomNav = ({ showDropdown, setShowDropdown, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <>
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

          {/* ✅ Simple Track Order page navigation */}
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
    </>
  );
};

export default BottomNav;