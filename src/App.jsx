import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Offers from "./pages/Offers";
import Checkout from "./pages/Checkout";
import OrderHistory from "./pages/OrderHistory";
import Login from "./pages/Login";
import Track from "./pages/Track";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import BottomNavbar from "./components/BottomNav";
import Navbar from "./components/Navbar"; // ✅ Add this
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar /> {/* ✅ Top profile/login nav */}
        <div className="pb-20 pt-16"> {/* Add padding for top navbar space */}
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/track" element={<Track />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
<Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <BottomNavbar />
        <ToastContainer position="bottom-center" />
      </Router>
    </CartProvider>
  );
};

export default App;