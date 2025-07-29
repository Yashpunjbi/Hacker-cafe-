import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Offers from "./pages/Offers";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify"; // ✅ Import ToastContainer
import "react-toastify/dist/ReactToastify.css";  // ✅ Import CSS


const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="pb-20"> {/* Space for  BottomNav */}
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/offers" element={<offers />} />
            <Route path="/checkout" element={<Checkout />} />  

       </Routes>
        </div>
        <Navbar />
        <ToastContainer position="bottom-center" /> {/* ✅ Add ToastContainer */}
      </Router>
    </CartProvider>
  );
};

export default App;