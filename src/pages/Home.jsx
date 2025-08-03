// src/pages/Home.jsx
import React from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";

const Home = () => {
  return (
    <div className="pt-4 pb-20">
      <Banner />
      <Categories />
    </div>
  );
};

export default Home;