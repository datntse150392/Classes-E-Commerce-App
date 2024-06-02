import React, { useEffect, useState } from "react";
import ProductCard from "../../components/Client/ProductCard";

// IMPORT API SERVICES
import { useEyeGlassService } from "../../services/index";

const Homepage = () => {
  const [data, setData] = useState([]);
  // Behavior variables
  const [loading, setLoading] = useState(true);

  // API variables
  const { fetchAllEyeGlass } = useEyeGlassService();

  useEffect(() => {
    const initEyeGlassData = async () => {
      const initEyeGlassData = await fetchAllEyeGlass();
      if (initEyeGlassData !== null && initEyeGlassData._statusCode === 200) {
        setData(initEyeGlassData._data);
        setLoading(false);
      }
    };
    initEyeGlassData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 flex">
      {/* Main Content Section */}
      <div className="w-3/4 pr-4">
        {/* Banner Section */}
        <div className="bg-pink-200 mb-4">
          <img
            src="https://via.placeholder.com/1082x480"
            alt="Banner"
            className="w-full"
          />
        </div>

        {/* Services Section */}
        <div className="flex justify-between mb-4">
          <div className="bg-teal-500 text-white p-4 rounded-md flex-1 mr-2 text-center">
            <h3 className="text-xl font-bold">ĐO MẮT</h3>
            <p>Kiểm tra mắt chuẩn quốc tế</p>
            <button className="mt-2 bg-white text-teal-500 py-2 px-4 rounded">
              Đặt lịch ngay
            </button>
          </div>
          <div className="bg-teal-500 text-white p-4 rounded-md flex-1 mr-2 text-center">
            <h3 className="text-xl font-bold">BẢO HÀNH</h3>
            <p>Bảo hành trọn đời</p>
            <button className="mt-2 bg-white text-teal-500 py-2 px-4 rounded">
              Đặt lịch ngay
            </button>
          </div>
          <div className="bg-teal-500 text-white p-4 rounded-md flex-1 text-center">
            <h3 className="text-xl font-bold">CHỨNG NHẬN</h3>
            <p>Chứng nhận quốc tế</p>
            <button className="mt-2 bg-white text-teal-500 py-2 px-4 rounded">
              Đặt lịch ngay
            </button>
          </div>
        </div>

        {/* Best Sellers Section */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">KÍNH NAM BÁN CHẠY</h2>
          <div className="flex justify-between mb-2">
            <div className="flex space-x-2">
              {["All", "Plate", "Bowl", "Glass", "Vase", "Others"].map(
                (category, index) => (
                  <button key={index} className="bg-gray-100 px-4 py-2 rounded">
                    {category}
                  </button>
                )
              )}
            </div>
            <a href="#" className="text-blue-500">
              View all
            </a>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {data.map((item, index) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.glassName}
                price={item.glassPrice}
                rating={4}
                isNew={index === 0}
                isHot={index === 1 || index === 2}
                isSoldOut={index === 3}
              />
            ))}
          </div>
        </div>

        {/* Women's Collection Section */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">KÍNH NỮ BÁN CHẠY</h2>
          <div className="flex justify-between mb-2">
            <div className="flex space-x-2">
              {["All", "Plate", "Bowl", "Glass", "Vase", "Others"].map(
                (category, index) => (
                  <button key={index} className="bg-gray-100 px-4 py-2 rounded">
                    {category}
                  </button>
                )
              )}
            </div>
            <a href="#" className="text-blue-500">
              View all
            </a>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {data.map((item, index) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.glassName}
                price={item.glassPrice}
                rating={4}
                isNew={index === 0}
                isHot={index === 1 || index === 2}
                isSoldOut={index === 3}
              />
            ))}
          </div>
        </div>

        {/* Hot Trend Section */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">KÍNH MẮT HOT TREND</h2>
          <div className="flex justify-between mb-2">
            <div className="flex space-x-2">
              {["All", "Plate", "Bowl", "Glass", "Vase", "Others"].map(
                (category, index) => (
                  <button key={index} className="bg-gray-100 px-4 py-2 rounded">
                    {category}
                  </button>
                )
              )}
            </div>
            <a href="#" className="text-blue-500">
              View all
            </a>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {data.map((item, index) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.glassName}
                price={item.glassPrice}
                rating={4}
                isNew={index === 0}
                isHot={index === 1 || index === 2}
                isSoldOut={index === 3}
              />
            ))}
          </div>
        </div>

        {/* Subscription Section */}
        <div className="bg-teal-500 text-white p-4 rounded-md text-center">
          <h3 className="text-lg font-bold">Yes!</h3>
          <p>
            Send me exclusive offers, unique gift ideas, and personalized tips
            for shopping and selling on Commerce.
          </p>
          <div className="flex justify-center mt-2">
            <input
              type="email"
              className="p-2 rounded-l-md border-none"
              placeholder="Drop your email"
            />
            <button className="bg-orange-500 text-white p-2 rounded-r-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Blog and Cart Section */}
      <div className="w-1/4">
        {/* Blog Section */}
        <div className="bg-white p-4 shadow rounded-md mb-4">
          <h2 className="text-lg font-bold mb-2">Blog</h2>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="bg-gray-300 h-16 w-16 mr-4"></div>
                <div>
                  <p className="text-sm">27/05/2023</p>
                  <p>Decorate your home with recycled products</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="bg-white p-4 shadow rounded-md mb-4">
          <h2 className="text-lg font-bold mb-2">Cart</h2>
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-gray-300 h-16 w-16 mr-4"></div>
                  <div>
                    <p>Product Name</p>
                    <p className="text-sm text-gray-600">Color</p>
                  </div>
                </div>
                <div>$180</div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <p className="text-lg font-bold mb-2">Subtotal: $800</p>
            <button className="w-full bg-teal-500 text-white py-2 rounded">
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
