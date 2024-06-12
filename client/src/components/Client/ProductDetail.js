import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";

// IMPORT API SERVICES
import { useEyeGlassService } from "../../services/index";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { fetchEyeGlassById } = useEyeGlassService();

  useEffect(() => {
    const initEyeGlassData = async () => {
      try {
        const initEyeGlassData = await fetchEyeGlassById(id);
        if (initEyeGlassData !== null && initEyeGlassData._statusCode === 200) {
          let addFakeData = initEyeGlassData._data;
          addFakeData.images = addFakeData.images || [
            "https://via.placeholder.com/400x400",
            "https://via.placeholder.com/400x400",
            "https://via.placeholder.com/400x400",
          ];
          addFakeData.rating = addFakeData.rating || 4;
          addFakeData.sizes = addFakeData.sizes || ["Small", "Medium", "Large"];
          addFakeData.colors = addFakeData.colors || [
            "#000000",
            "#FFFFFF",
            "#FF0000",
          ]; // Thêm màu giả
          addFakeData.reviews = addFakeData.reviews || 2750; // Thêm reviews giả
          addFakeData.popularity = addFakeData.popularity || 313; // Thêm popularity giả
          setData(addFakeData);
          setLoading(false);
        } else {
          setError("Failed to fetch product data");
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch product data");
        setLoading(false);
      }
    };
    initEyeGlassData();
  }, [id, fetchEyeGlassById]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const handleSelectLensesClick = () => {
    navigate(`/select-lenses/${id}`);
  };

  return (
    <div className="container mx-auto p-8 mt-10 flex flex-col md:flex-row">
      <div className="flex-1 p-4">
        <div className="flex flex-wrap -mx-2">
          {data.images &&
            data.images.map((image, index) => (
              <div key={index} className="w-1/2 p-2">
                <img
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="rounded-lg object-cover"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex-1 p-4">
        <h1 className="text-4xl font-bold mb-4">{data.glassName}</h1>
        <p className="text-lg text-gray-500 mb-2">{data.glassType}</p>
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`mr-1 ${
                i < data.rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2">{data.reviews} Reviews</span>
        </div>
        <p className="text-lg text-green-500 mb-2">
          Popular frame! {data.popularity} people have their eyes on this frame.
        </p>
        <p className="text-2xl font-semibold mb-4 text-primary">
          ${data.glassPrice}
        </p>
        <p className="text-gray-700 mb-6 whitespace-pre-line">
          {data.glassDescription}
        </p>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Colors</h3>
          <div className="flex space-x-2">
            {data.colors &&
              data.colors.map((color, index) => (
                <span
                  key={index}
                  className="w-8 h-8 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                />
              ))}
          </div>
        </div>
        <p className="text-xl font-semibold mb-4">${data.glassPrice}</p>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Size</h3>
          <div className="flex space-x-2">
            {data.sizes &&
              data.sizes.map((size, index) => (
                <button
                  key={index}
                  className="py-2 px-4 border rounded-full hover:bg-gray-100"
                >
                  {size}
                </button>
              ))}
          </div>
        </div>
        <button
          className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark transition duration-200"
          onClick={handleSelectLensesClick}
        >
          Select Lenses
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
