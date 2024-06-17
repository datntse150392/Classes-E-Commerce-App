import React, { useEffect, useState, useContext, useRef } from "react";
import ProductCard from "../../components/Client/ProductCard";
import { SearchContext } from '../../context/SearchContext';
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "../../context/ToastContext";

// IMPORT API SERVICES
import { useEyeGlassService } from "../../services/index";

const Homepage = () => {
  // Data variables
  const location = useLocation();
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [eyeGlassTypes, setEyeGlassTypes] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);

  const { setToastMessage } = useToast();
  const [toastMessage, setToastMessageState] = useState(location.state?.toast || {});

  // Behavior variables
  const [loading, setLoading] = useState(true);
  const { search } = useContext(SearchContext);

  // API variables
  const { fetchAllEyeGlass, fetchAllEyeGlassTypes, fetchCartByAccountID } = useEyeGlassService();

  // Fetch all eye glass data and eye glass types
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eyeGlassData, eyeGlassTypes] = await Promise.all([
          fetchAllEyeGlass(),
          fetchAllEyeGlassTypes()
        ]);

        if (eyeGlassData !== null && eyeGlassData.data.length > 0) {
          // Check data with status = true
          eyeGlassData.data = eyeGlassData.data.filter((item) => item.status === true);
          setData(eyeGlassData.data);
          setOriginalData(eyeGlassData.data);
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
            })
          });
          setEyeGlassTypes(eyeGlassTypesTemp);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const getCart = async () => {
      let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
      if (UserInfo) {
        const response = await fetchCartByAccountID(UserInfo.id);
        if (response && response.length > 0) {
          // Sort the cart by order date
          response.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
          setCart(response);
          response.forEach((item) => {
            setTotalCartPrice((prev) => prev + item.price);
          });
        }
      }
    };

    getCart();
    fetchData();
  }, []);

  useEffect(() => {
    const handleToast = (toastMessage) => {
      if (toastMessage) {
        if (toastMessage.type === "success" || toastMessage.type === "error") {
          setToastMessage(toastMessage);
        }
        if (toastMessage.message === "Logged out successfully") {
          window.location.reload();
        }
      }
    };
    handleToast(toastMessage);
  }, [toastMessage, setToastMessage, location.pathname]);

  // Update the data based on the search value
  useEffect(() => {
    const searchValue = search.toLowerCase();
    const eyeGlassDataTemp = originalData.filter((eyeGlass) => {
      return eyeGlass.name.toLowerCase().includes(searchValue);
    });
    setData(eyeGlassDataTemp);
  }, [search, originalData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // PAGES LOGIC ZONE
  const changeEyeGlassTypes = (item) => {
    let eyeGlassTypesTemp = eyeGlassTypes.map((category) => {
      if (category.id === item.id) {
        return { ...category, isChoiced: true };
      } else {
        return { ...category, isChoiced: false };
      }
    });

    // Update glass eye data
    if (item.id === 0) {
      setData(originalData);
      setEyeGlassTypes(eyeGlassTypesTemp);
      return;
    }

    let eyeGlassDataTemp = [];
    originalData.forEach((eyeGlass) => {
      if (eyeGlass.eyeGlassType.id === item.id) {
        eyeGlassDataTemp.push(eyeGlass);
      }
    });
    if (eyeGlassDataTemp) {
      setData([...eyeGlassDataTemp]);
    } else {
      setData([]);
    }
    setEyeGlassTypes(eyeGlassTypesTemp);
  }

  const convertDateToString = (date) => {
    return new Date(date).toLocaleDateString();
  }

  const handleToast = (toastMessage) => {
    if (toastMessage && toastMessage.type === "success") {
      toast.success(toastMessage.message);
    } else if (toastMessage && toastMessage.type === "error") {
      toast.error(toastMessage.message);
    } else if (toastMessage && toastMessage.type === "info") {
      toast.info(toastMessage.message);
    }
  }

  return (
    <div className="container mx-auto p-4 flex">
      {/* Main Content Section */}
      <div className="w-3/4 pr-4">
        {/* Banner Section */}
        <div className="bg-pink-200 mb-4">
          <img
            src="https://img.ebdcdn.com/cms/H1_Desktop_1600_520_31fad7224d.jpg?q=70&im=Resize,width=2400,height=780,aspect=fill&seo=06-12-grandpa-core-collection-d"
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
          <h2 className="text-xl font-bold mb-2">CÁC LOẠI MẮT KÍNH</h2>
          <div className="flex justify-between mb-2">
            <div className="flex flex-wrap">
              {eyeGlassTypes.map(
                (category, index) => (
                  category.isChoiced ? (
                    <button key={index} className="bg-teal-500 text-white mr-2 mb-2 px-4 py-2 rounded">
                      {category.glassType}
                    </button>
                  ) : (
                    <button onClick={() => changeEyeGlassTypes(category)} key={index} className="bg-gray-100 mr-2 mb-2 px-4 py-2 rounded">
                      {category.glassType}
                    </button>
                  )
                )
              )}
            </div>
            {/* <a href="#" className="text-blue-500">
              View all
            </a> */}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {data.map((item, index) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                rating={item.rate}
                isNew={index === 0}
                isHot={index === 1 || index === 2}
                isSoldOut={index === 3}
                image={item.eyeGlassImages}
              />
            ))}
          </div>
        </div>

        {/* Hot Trend Section */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">KÍNH MẮT HOT TREND</h2>
          <div className="grid grid-cols-4 gap-4">
            {/* GET 4 HOT TREND ITEMS HERE */}
            {originalData.slice(0, 4).map((item, index) => (
              <ProductCard
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                rating={item.rate}
                isHot={index === 0 || index === 1 || index === 2 || index === 3}
                image={item.eyeGlassImages}
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
        {cart.length > 0 && (
        <div className="bg-white p-4 shadow rounded-md mb-4">
          <h2 className="text-lg font-bold mb-2">Cart</h2>
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-t-2">
                  <div className="flex items-center">
                    <div className="h-16 w-4 mr-4 text-gray-600 content-center">
                      {index + 1}
                    </div>
                    <div className="content-center">
                      <p className="text-sm text-gray-600 truncate ...">Code: {item.code}</p>
                      <p className="text-sm text-gray-600">Date: {convertDateToString(item.orderDate)}</p>
                      <p className="text-sm text-gray-600">Receiver: {item.receiverAddress.trim() || "Quận 7"}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <button onClick={() => handleToast({
                type: "info",
                message: "Functionality is in development!"
              })} className="w-full bg-teal-500 text-white py-2 rounded">
                Check out
              </button>
            </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
