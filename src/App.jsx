import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Offers from "./pages/Offers";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";      // ✅ Import Order History
import Track from "./pages/Track";        // ✅ Import Track Orders
import Contact from "./pages/Contact";    // ✅ Import Contact Us
import Terms from "./pages/Terms";        // ✅ Import Terms & Conditions
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="pb-20"> {/* Space for BottomNav */}
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/offers" element={<Offers />} />     {/* ✅ Fixed Offers import */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />     {/* ✅ Order History */}
            <Route path="/track" element={<Track />} />       {/* ✅ Track Orders */}
            <Route path="/contact" element={<Contact />} />   {/* ✅ Contact Us */}
            <Route path="/terms" element={<Terms />} />       {/* ✅ Terms & Conditions */}
          </Routes>
        </div>
        <Navbar />
        <ToastContainer position="bottom-center" />
      </Router>
    </CartProvider>
  );
};

export default App;