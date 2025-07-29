import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Offers from "./components/Offers";
import Checkout from "./pages/Checkout";
import BottomNav from "./components/BottomNav";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="pb-20"> {/* Space for BottomNav */}
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />

<Route path="/offers" element={<Offers />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
        <BottomNav />
      </Router>
    </CartProvider>
  );
};

export default App;