import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";

// IMPORT API SERVICES
import { useEyeGlassService } from "../../services/index";

const ProductDetail = () => {
  const { id } = useParams();

  const [data, setData] = useState();
  // Behavior variables
  const [loading, setLoading] = useState(true);

  // API variables
  const { fetchEyeGlassById } = useEyeGlassService();

  useEffect(() => {
    const initEyeGlassData = async () => {
      const initEyeGlassData = await fetchEyeGlassById(id);
      if (initEyeGlassData !== null && initEyeGlassData._statusCode === 200) {
        let addFakeData = initEyeGlassData._data;
        addFakeData.images = [
          "https://via.placeholder.com/400x400",
          "https://via.placeholder.com/400x400",
          "https://via.placeholder.com/400x400"
        ]
        addFakeData.rating = 4;
        addFakeData.sizes = ["Small", "Medium", "Large"];
        setData(addFakeData);
        setLoading(false);
      }
    };
    initEyeGlassData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8  mt-10">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4">
          <div className="flex flex-wrap -mx-2">
            {data.images.map((image, index) => (
              <div key={index} className="w-1/2 p-2">
                <img
                  src={image}
                  alt={data.glassName}
                  className="rounded-lg object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4">
          <h1 className="text-4xl font-bold mb-4">{data.glassName}</h1>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`mr-1 ${
                  i < data.rating ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-2xl font-semibold mb-4 text-primary">
            ${data.glassPrice}
          </p>
          <p className="text-gray-700 mb-6 whitespace-pre-line">
            {data.glassDescription}
          </p>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Colors</h3>
            <div className="flex space-x-2">
              <span
                className="w-8 h-8 rounded-full border border-gray-300"
                style={{ backgroundColor: data.color }}
              />
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Size</h3>
            <div className="flex space-x-2">
              {data.sizes.map((size, index) => (
                <button
                  key={index}
                  className="py-2 px-4 border rounded-full hover:bg-gray-100"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          <button className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition duration-200">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
