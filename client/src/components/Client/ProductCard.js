import React, {useEffect, useLayoutEffect, useState} from "react";
import { FaStar, FaHeart } from "react-icons/fa";

import { Link } from "react-router-dom";

const ProductCard = ({ id, name, price, rating, isNew, isHot, isSoldOut, image }) => {
  const [imageUrl, setImageUrl] = useState("https://img.ebdcdn.com/product/frame/gray/mt6960_0.jpg?im=Resize,width=600,height=300,aspect=fill;UnsharpMask,sigma=1.0,gain=1.0&q=85");

  // Có data image thì mở comment dòng dưới
  // useLayoutEffect(() => {
  //   if (image && image.length > 0) {
  //     setImageUrl(image[0].url);
  //   }
  // }, [image]);
  return (
    <div className="bg-white p-4 shadow rounded-md text-center relative">
      <div className="bg-[#f5f5f5] h-32 mb-2 flex justify-center items-center">
        <Link to={`product/${id}`}>
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-auto"
          />
        </Link>
      </div>
      <Link to={`product/${id}`}>
        <p className="text-sm">{name}</p>
      </Link>
      <div className="flex justify-center items-center my-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`mr-1 ${i < rating ? "text-yellow-400" : "text-gray-300"
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
