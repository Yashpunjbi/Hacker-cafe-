import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Home, Tag, ShoppingCart, User, LogIn } from "lucide-react";
import LoginModal from "./LoginModal";

const auth = getAuth();

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Tiffin", path: "/offers", icon: Tag },
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

        {/* 👤 Profile OR 🔐 Login */}
        {user ? (
          <button
            onClick={() => navigate("/profile")}
            className={`flex flex-col items-center text-xs transition ${
              pathname === "/profile"
                ? "text-red-500 font-semibold"
                : "text-gray-500"
            }`}
          >
            <User
              size={22}
              className={
                pathname === "/profile" ? "text-red-500" : "text-gray-400"
              }
            />
            <span className="mt-1">Profile</span>
          </button>
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

      {/* Login Modal */}
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
    </>
  );
};

export default Navbar;