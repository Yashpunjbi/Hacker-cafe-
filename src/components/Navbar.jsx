import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Home, Tag, ShoppingCart, User, LogIn } from "lucide-react";
import LoginModal from "./LoginModal";
import UserMenu from "./UserMenu";

const auth = getAuth();

const Navbar = () => {
  const { pathname } = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Offers", path: "/offers", icon: Tag },
    { name: "Cart", path: "/cart", icon: ShoppingCart },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-red-100 shadow-md flex justify-around py-2 z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center text-xs transition ${
                active ? "text-red-500 font-semibold" : "text-gray-500"
              }`}
            >
              <Icon
                size={22}
                className={active ? "text-red-500" : "text-gray-400"}
              />
              <span className="mt-1">{item.name}</span>
            </Link>
          );
        })}

        {/* 👤 Profile or 🔐 Login */}
        {user ? (
          <div className="relative flex flex-col items-center text-xs">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex flex-col items-center transition ${
                showUserMenu ? "text-red-500" : "text-gray-500"
              }`}
            >
              <User size={22} />
              <span className="mt-1">Profile</span>
            </button>
            {showUserMenu && <UserMenu user={user} />}
          </div>
        ) : (
          <button
            onClick={() => setIsLoginOpen(true)}
            className="flex flex-col items-center text-xs text-gray-500 hover:text-red-500 transition"
          >
            <LogIn size={22} />
            <span className="mt-1">Login</span>
          </button>
        )}
      </nav>

      {/* 🔓 Login Modal */}
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
    </>
  );
};

export default Navbar;