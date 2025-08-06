import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginModal from "./LoginModal";
import UserMenu from "./UserMenu";

const auth = getAuth();

const Navbar = () => {
  const { pathname } = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Offers", path: "/offers", icon: "🎁" },
    { name: "Cart", path: "/cart", icon: "🛒" },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
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

        {/* 👤 Profile or 🔐 Login */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex flex-col items-center text-sm text-gray-700"
            >
              <span className="text-xl">👤</span>
              Profile
            </button>
            {showUserMenu && <UserMenu user={user} />}
          </div>
        ) : (
          <button
            onClick={() => setIsLoginOpen(true)}
            className="flex flex-col items-center text-sm text-gray-500"
          >
            <span className="text-xl">🔐</span>
            Login
          </button>
        )}
      </nav>

      {/* 🔓 Login Modal */}
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
    </>
  );
};

export default Navbar;