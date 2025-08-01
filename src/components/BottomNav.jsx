import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaTags, FaShoppingCart, FaUser } from 'react-icons/fa';

const BottomNavbar = () => {
  const location = useLocation();

  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: <FaHome size={22} />,
    },
    {
      name: 'Offers',
      path: '/offers',
      icon: <FaTags size={22} />,
    },
    {
      name: 'Cart',
      path: '/cart',
      icon: <FaShoppingCart size={22} />,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <FaUser size={22} />,
    },
  ];

  return (
    <div className="fixed bottom-0 w-full h-[60px] bg-white shadow-lg border-t border-gray-200 flex justify-around items-center z-50">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            to={item.path}
            key={item.name}
            className={`flex flex-col items-center text-xs font-medium ${
              isActive ? 'text-orange-500' : 'text-gray-500'
            }`}
          >
            <div>{item.icon}</div>
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavbar;