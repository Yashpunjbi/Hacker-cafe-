import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Offers from "./pages/Offers";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import Track from "./pages/Track";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import BottomNavbar from "./components/BottomNav"; // ✅ updated
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="pb-20">
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/track" element={<Track />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </div>
        <BottomNavbar /> {/* 👈 New updated nav */}
        <ToastContainer position="bottom-center" />
      </Router>
    </CartProvider>
  );
};

export default App;