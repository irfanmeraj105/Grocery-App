import React, { useContext } from "react";
import { categories } from "../assets/assets";
import { AppContext } from "../Context/AppContext";

const Categories = () => {
  const { navigate } = useContext(AppContext);

  return (
    <div className="mt-16">
      <p className="text-2xl font-medium md:text-3xl">Categories</p>
      <div className="grid my-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center justify-center">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              window.scrollTo(0, 0);
            }}
            className="flex items-center justify-center group cursor-pointer py-5 px-3 rounded-lg gap-2 flex-col"
            style={{ backgroundColor: category.bgColor }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="max-w-28 transition group-hover:scale-110"
            />
            <p className="text-sm font-medium">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
