import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    onLogout();
  };

  return (
    <div className="absolute bottom-14 right-2 w-64 bg-white rounded-xl shadow-2xl z-50 border border-gray-200 animate-fade-in">
      <div className="px-5 py-4 border-b border-gray-200">
        <p className="text-xs text-gray-400">Signed in as</p>
        <p className="font-semibold text-gray-800 truncate">{user.email}</p>
      </div>

      <ul className="text-sm font-medium text-gray-700">
        <li
          onClick={() => navigate("/orders")}
          className="px-5 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
        >
          📦 Order History
        </li>
        <li
          onClick={() => navigate("/track")}
          className="px-5 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
        >
          📞 Contact Us
        </li>
        <li
          onClick={() => navigate("/terms")}
          className="px-5 py-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
        >
          📜 Terms & Conditions
        </li>
      </ul>

      <div className="border-t border-gray-200 px-5 py-3">
        <button
          onClick={handleLogout}
          className="w-full text-left text-red-600 hover:text-red-700 transition duration-150"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;