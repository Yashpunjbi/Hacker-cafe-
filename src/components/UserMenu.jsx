import React from "react";
import { getAuth, signOut } from "firebase/auth";

const UserMenu = ({ user, onLogout }) => {
  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    onLogout();
  };

  return (
    <div className="absolute bottom-14 right-2 w-56 bg-white shadow-lg rounded-lg z-50 border">
      <div className="px-4 py-3 border-b">
        <p className="text-sm text-gray-500">Signed in as</p>
        <p className="font-medium">{user.email}</p>
      </div>
      <ul className="text-sm">
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">📦 Order History</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">🚚 Track Orders</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">📞 Contact Us</li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">📜 Terms & Conditions</li>
      </ul>
      <div className="border-t px-4 py-2">
        <button
          onClick={handleLogout}
          className="w-full text-left text-red-600 hover:underline"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;