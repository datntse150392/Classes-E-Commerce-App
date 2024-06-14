import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";

// IMPORT API SERVICES
import { useEyeGlassService } from "../../services/index";

// IMPORT COMPONENT
import { Tooltip } from "react-tooltip";

SwiperCore.use([Navigation, Pagination]);

const colors = [
  {
    color: "Black",
    hex: "#0d0d0d",
  },
  // ... Other colors
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Data variables
  const [data, setData] = useState(null);
  const [eyeGlassTypes, setEyeGlassTypes] = useState([]);

  // Behavior variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API variables
  const { fetchEyeGlassById, fetchAllEyeGlassTypes } = useEyeGlassService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eyeGlassData, eyeGlassTypes] = await Promise.all([
          fetchEyeGlassById(id),
          fetchAllEyeGlassTypes(),
        ]);

        if (eyeGlassData) {
          setData({
            ...eyeGlassData,
            eyeGlassImages: [
              "https://img.ebdcdn.com/product/model/portrait/mt7232_w0.jpg?im=Resize,width=500,height=600,aspect=fill;UnsharpMask,sigma=1.0,gain=1.0&q=85",
              "https://img.ebdcdn.com/product/frame/gray/mt6960_2.jpg?im=Resize,width=900,height=450,aspect=fill;UnsharpMask,sigma=1.0,gain=1.0&q=85",
              "https://img.ebdcdn.com/product/frame/gray/mt6960_1.jpg?im=Resize,width=680,height=340,aspect=fill;UnsharpMask,sigma=1.0,gain=1.0&q=85",
            ],
            sizes: ["Small", "Medium", "Large"],
            reviews: 2750,
            popularity: 313,
            colorHex: colors.find((item) => item.color === eyeGlassData.color)
              ?.hex,
            selectedSize: "Small",
          });
          setLoading(false);
        }

        if (eyeGlassTypes !== null && eyeGlassTypes.length > 0) {
          let eyeGlassTypesTemp = [
            { id: 0, glassType: "All", status: true, isChoiced: true },
          ];
          eyeGlassTypes.forEach((item) => {
            eyeGlassTypesTemp.push({
              id: item.id,
              glassType: item.glassType,
              status: item.status,
              isChoiced: false,
            });
          });
          setEyeGlassTypes(eyeGlassTypesTemp);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  // LOGIC FUNCTIONS ZONE
  const handleSelectLensesClick = () => {
    let objectData = {
      ...data,
      glassTypeText: eyeGlassTypes.find(
        (item) => item.id === data.eyeGlassTypeID
      )?.glassType,
    };

    navigate(`/select-lenses/${id}`, {
      state: {
        productData: objectData,
      },
    });
  };

  const handleChooseSize = (size) => {
    setData({
      ...data,
      selectedSize: size,
    });
  };

  return (
    <div className="container mx-auto p-8 mt-10 flex flex-col md:flex-row">
      <Tooltip id="my-tooltip" />
      <Swiper
        className="w-full md:w-1/2"
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
      >
        {data.eyeGlassImages &&
          data.eyeGlassImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-[50vh] bg-[#f5f5f5]">
                <img
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className="h-full w-full rounded-lg object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="flex-1 p-4">
        <h1 className="text-4xl font-bold mb-4">{data.name}</h1>
        <p className="text-lg text-gray-500 mb-2">
          {
            eyeGlassTypes.find((item) => item.id === data.eyeGlassTypeID)
              ?.glassType
          }
        </p>
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`mr-1 ${
                i < data.rate ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2">{data.reviews} Reviews</span>
        </div>
        <p className="text-lg text-green-500 mb-2">
          Popular frame! {data.popularity} people have their eyes on this frame.
        </p>
        <p className="text-2xl font-semibold mb-4 text-primary">
          ${data.price}
        </p>
        <p className="text-gray-700 mb-6 whitespace-pre-line">
          {data.glassDescription ||
            "These full-rim metal frames are currently hot fashion for women and men. The on-trend frame-shape of St. Michael S brings extra elegance with the tasteful Rose Gold finish. The lightweight materials give you extra comfort with adjustable nose pads, for an easy-to-wear comfortable fit"}
        </p>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Colors</h3>
          <div className="flex space-x-2">
            <span
              data-tooltip-id="my-tooltip"
              data-tooltip-content={data.color}
              data-tooltip-place="top"
              className="w-8 h-8 cursor-pointer rounded-full border border-gray-300"
              style={{ backgroundColor: data.colorHex }}
            />
          </div>
        </div>
        <p className="text-xl font-semibold mb-4">${data.price}</p>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Size</h3>
          <div className="flex space-x-2">
            {data.sizes &&
              data.sizes.map((size, index) =>
                size === data.selectedSize ? (
                  <button
                    key={index}
                    className="px-4 py-2 bg-primary text-white rounded-full font-semibold"
                  >
                    {size}
                  </button>
                ) : (
                  <button
                    key={index}
                    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-full font-semibold hover:bg-gray-300 transition duration-200"
                    onClick={() => handleChooseSize(size)}
                  >
                    {size}
                  </button>
                )
              )}
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
