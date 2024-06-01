import React from "react";
import { FaStar, FaHeart } from "react-icons/fa";

const ProductCard = ({ name, price, rating, isNew, isHot, isSoldOut }) => {
  return (
    <div className="bg-white p-4 shadow rounded-md text-center relative">
      <div className="bg-gray-300 h-32 mb-2 flex justify-center items-center">
        <img
          src="https://via.placeholder.com/100x100"
          alt={name}
          className="h-full w-auto"
        />
      </div>
      <p className="text-sm">{name}</p>
      <div className="flex justify-center items-center my-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`mr-1 ${
              i < rating ? "text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <p className="text-sm font-semibold">${price}</p>
      <div className="absolute top-2 left-2">
        {isNew && (
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
            New
          </span>
        )}
        {isHot && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded ml-1">
            Hot
          </span>
        )}
        {isSoldOut && (
          <span className="bg-black text-white text-xs px-2 py-1 rounded ml-1">
            Sold out
          </span>
        )}
      </div>
      <div className="absolute top-2 right-2">
        <FaHeart className="text-gray-300 hover:text-primary cursor-pointer" />
      </div>
    </div>
  );
};

export default ProductCard;
