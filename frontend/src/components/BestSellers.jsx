import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import ProductCard from "./ProductCard";

const BestSellers = () => {
  const { products } = useContext(AppContext);
  return (
    <>
      <div className="mt-16">
        <p className="text-2xl font-medium md:text-3xl">BestSellers</p>
        <div className="grid my-6 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center justify-center" >
          {products
            .filter((product) => product.inStock)
            .slice(0, 5)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>
      </div>
    </>
  );
};

export default BestSellers;
