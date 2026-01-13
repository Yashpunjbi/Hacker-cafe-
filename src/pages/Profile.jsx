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
    <div className="min-h-screen bg-white px-4 pt-6">
      <h2 className="text-2xl font-bold text-red-500 mb-6">
        My Profile
      </h2>

      <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-6">
        <p className="font-semibold">Logged in as</p>
        <p className="text-sm text-gray-700">{user?.email}</p>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => navigate("/orders")}
          className="w-full text-left px-4 py-3 rounded-xl border hover:bg-red-50"
        >
          📦 Order History
        </button>

        <button
          onClick={() => navigate("/track")}
          className="w-full text-left px-4 py-3 rounded-xl border hover:bg-red-50"
        >
          🚚 Track Order
        </button>

        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-3 rounded-xl border text-red-500 hover:bg-red-100"
        >
          🔓 Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;