import { FaHome, FaTags, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around p-2 z-50">
      <Link to="/" className="flex flex-col items-center text-pink-600">
        <FaHome size={20} />
        <span className="text-xs">Home</span>
      </Link>
      <Link to="/" className="flex flex-col items-center text-pink-600">
        <FaTags size={20} />
        <span className="text-xs">Offers</span>
      </Link>
      <Link to="/cart" className="flex flex-col items-center text-pink-600">
        <FaShoppingCart size={20} />
        <span className="text-xs">Cart</span>
      </Link>
    </div>
  );
};

export default BottomNav;