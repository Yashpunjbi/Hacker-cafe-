import { FaHome, FaTags, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around p-2 z-50">
      <button onClick={() => navigate("/")} className="flex flex-col items-center text-pink-600">
        <FaHome size={20} />
        <span className="text-xs">Home</span>
      </button>
      <button onClick={() => navigate("/offers")} className="flex flex-col items-center text-pink-600">
        <FaTags size={20} />
        <span className="text-xs">Offers</span>
      </button>
      <button onClick={() => navigate("/cart")} className="flex flex-col items-center text-pink-600">
        <FaShoppingCart size={20} />
        <span className="text-xs">Cart</span>
      </button>
    </div>
  );
};

export default BottomNav;