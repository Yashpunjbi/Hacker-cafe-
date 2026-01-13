import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white px-4 pt-6 pb-20">
      <h2 className="text-2xl font-bold text-red-500 mb-6">
        My Profile
      </h2>

      {/* User Info */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
        <p className="font-semibold text-gray-800">Logged in as</p>
        <p className="text-sm text-gray-700 break-all">
          {user?.email}
        </p>
      </div>

      {/* Menu Options */}
      <div className="space-y-4">
        <button
          onClick={() => navigate("/orders")}
          className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:bg-red-50 transition"
        >
          📦 Order History
        </button>

        <button
          onClick={() => navigate("/contact")}
          className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:bg-red-50 transition"
        >
          📞 Contact Us
        </button>

        <button
          onClick={() => navigate("/terms")}
          className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:bg-red-50 transition"
        >
          📜 Terms & Conditions
        </button>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 rounded-xl border border-red-200 text-red-500 hover:bg-red-100 transition"
        >
          🔓 Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;