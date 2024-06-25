import React, { useEffect, useState, useContext, useRef } from "react";
import ProductCard from "../../components/Client/ProductCard";
import { SearchContext } from '../../context/SearchContext';
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useToast } from "../../context/ToastContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperCore from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// IMPORT API SERVICES
import { useEyeGlassService } from "../../services/index";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Homepage = () => {
  // Data variables
  const location = useLocation();
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [eyeGlassTypes, setEyeGlassTypes] = useState([]);
  const [cart, setCart] = useState([]);

  const { setToastMessage } = useToast();
  const [toastMessage, setToastMessageState] = useState(location.state?.toast || {});

  // Behavior variables
  const [loading, setLoading] = useState(true);
  const { search } = useContext(SearchContext);
  const images = [
    "https://img.ebdcdn.com/cms/H1_Desktop_1600_520_31fad7224d.jpg?q=70&im=Resize,width=2400,height=780,aspect=fill&seo=06-12-grandpa-core-collection-d",
    "https://img.ebdcdn.com/cms/H1_Desktop_1600_520_53b755d2f4.jpg?q=70&im=Resize,width=2400,height=780,aspect=fill&seo=06-24-30-off-$100+-d"
  ];
  const reviewer = [
    { id: 1, name: "MICKAELIA W.", title: "The website was easy to use, the glasses shipped quickly, and I get nothing but compliments on my new glasses! Thanks!!" },
    { id: 2, name: "JUAN F.", title: "These glasses fit perfectly! They are super lightweight, yet also feel very sturdy at the same time. The colors and design are beautiful. Will be a returning customer!" },
    { id: 3, name: "EMILY S.", title: "It's so user friendly and the customer service is incredible! I tell everyone who compliments my glasses (which happens a lot!) to use this site. Thank you!" }
  ]

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

    const getCartAndOrder = async () => {
      let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
      if (UserInfo) {
        const [cartResponse] = await Promise.all([
          fetchCartByAccountID(UserInfo.id)
        ]);
        if (cartResponse && cartResponse.cartDetails.length > 0) {
          // Sort the cart by order date
          setCart(cartResponse);
        }
      }
    };

    getCartAndOrder();
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

  const handleRedirectToCart = () => {
    navigate("/cart", {
      state: { cart: cart }
    });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 flex">
      {/* Main Content Section */}
      <div className="w-3/4 pr-4">
        {/* Banner Section */}
        <div className="bg-pink-200 mb-4">
        <Swiper
        className="w-full"
        spaceBetween={10}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[50vh] bg-[#f5f5f5]">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="h-full w-full rounded-lg object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
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
        {/* Reviewer Section */}
        <div className="bg-white p-4 shadow rounded-md mb-4">
          <h2 className="text-lg font-bold mb-2">Reviewer</h2>
          <div className="space-y-4">
            {reviewer.map((item, index) => (
              <div key={item.id} className="flex items-center pb-2 border-b-2 border-gray-500">
                <div className="custom-bg"></div>
                <div>
                  <p className="text-md font-bold">{item.name}</p>
                  <p className="text-justify text-sm">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        {cart && cart.cartDetails && cart.cartDetails.length > 0 && (
        <div className="bg-white p-4 shadow rounded-md mb-4">
          <h2 className="text-lg font-bold mb-2">Cart</h2>
            <div className="space-y-4">
              {cart.cartDetails.map((item, index) => (
                <div key={index}
                  className="cursor-pointer flex justify-between items-center border-t-2 py-2"
                  style={{
                    marginTop: 0
                  }}>
                  <div className="flex items-center">
                    <div
                      className="h-12 w-12 mr-2"
                      style={{
                        backgroundImage: "url('https://img.icons8.com/bubbles/100/shopping-cart-loaded.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                    <div className="content-center">
                      <p className="text-sm text-gray-600 truncate ...">Glass: {item.eyeGlassName}</p>
                      {/* <p className="text-sm text-gray-600">Glass Price: {item.eyeGlassPrice}</p> */}
                      <p className="text-sm text-gray-600 truncate ...">Lens: {item.lensName}</p>
                      {/* <p className="text-sm text-gray-600">Lens Price: {item.lensPrice}</p> */}
                      {/* <p className="text-sm text-gray-600">Total Price: {item.totalPriceProductGlass}</p> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-lg font-bold mb-2">Subtotal: ${cart.totalPrice}</p>
              <button onClick={() => handleRedirectToCart()} className="w-full bg-teal-500 text-white py-2 rounded">
                My Cart
              </button>
            </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
