import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offers from "./pages/Offers";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 pb-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Navbar />
      </div>
    </Router>
  );
};

export default App;