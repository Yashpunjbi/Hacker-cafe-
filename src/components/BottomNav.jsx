import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaTags, FaShoppingCart, FaUser } from 'react-icons/fa';

const BottomNavbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: <FaHome /> },
    { name: 'Offers', path: '/offers', icon: <FaTags /> },
    { name: 'Cart', path: '/cart', icon: <FaShoppingCart /> },
    { name: 'Profile', path: '/profile', icon: <FaUser /> },
  ];

  return (
    <div className="fixed bottom-0 w-full h-[60px] bg-white shadow-md flex justify-around items-center border-t rounded-t-2xl z-50">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`flex flex-col items-center text-sm ${
            location.pathname === item.path ? 'text-orange-500' : 'text-gray-500'
          }`}
        >
          <div className="text-xl">{item.icon}</div>
          <span className="text-[10px]">{item.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavbar;