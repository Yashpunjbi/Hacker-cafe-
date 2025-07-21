import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offers from "./pages/Offers";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout"; // agar ye bana liya hai
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext"; // 👈 import context

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} /> {/* Optional */}
          </Routes>
          <Navbar />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;