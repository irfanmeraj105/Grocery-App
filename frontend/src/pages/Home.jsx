import React from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import BestSellers from "../components/BestSellers";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <div className="mt-10">
      <Hero />
      <Categories />
      <BestSellers />
      <NewsLetter/>
    </div>
  );
};

export default Home;
