import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORT API SERVICES
import { useEyeGlassService } from "../../services/index";

const OrderConfirmation = () => {
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));

  const location = useLocation();
  const { data, orderData, productGlassData, cartData, typePayment } = location.state || {};

  // Data for payment one item
  const [paymentObject, setPaymentObject] = useState({});
  const [originalObject, setOriginalObject] = useState({});
  // Data for payment all items
  const [paymentAllObject, setPaymentAllObject] = useState({});
  const [originalAllObject, setOriginalAllObject] = useState({});
  const [address, setAddress] = useState("");

  // API variables
  const { createOrderProduct, createOrderDetail, createOrder, deleteCart, deleteOrder } = useEyeGlassService();

  // Behavior variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      const [responseCreateOrderProduct] = await Promise.all([
        createOrderProduct(paymentObject),
      ]);

      if (responseCreateOrderProduct?.id) {
        toast.success("Order confirmed successfully!");
        await deleteOrder(paymentObject.orderDetails[0].orderID);
        setTimeout(() => {
          // Reset location state and redirect
          navigate("/order", { replace: true, state: {} });
        }, 1000);
      } else {
        toast.error("Order failed");
      }
    } catch (err) {
      toast.error("Order failed");
    }
  };

  const handleConfirmAllItem = async () => {
    if (address === "") {
      toast.error("Please enter your address");
      return;
    }
  
    try {
      let body = {
        accountID: UserInfo.id,
        receiverAddress: address,
        orderDate: new Date(),
        total: 0,
        status: true,
        orderDetails: [],
      }
      // Loop for add item of cart to order
      for (const item of cartData.cartDetails) {
        body.total += item.totalPriceProductGlass;
        body.orderDetails.push({
            productGlassID: item.productGlassID,
            quantity: item.quantity,
            status: true,
            productGlassRequest: {
              eyeGlassID: item.eyeGlassImages[0].eyeGlassID,
              leftLenID: 39,
              rightLenID: 39,
              accountID: UserInfo.id,
              sphereOD: 2,
              cylinderOD: 2,
              axisOD: 2,
              sphereOS: 2,
              cylinderOS: 2,
              axisOS: 2,
              addOD: 2,
              addOS: 2,
              pd: 2,
              status: true,
            }
        });
      }
      const responseCreateOrderProduct = await createOrderProduct(body);
      if (responseCreateOrderProduct && responseCreateOrderProduct?.id) {
        cartData.cartDetails.map(async (item) => {
          await deleteCart(UserInfo.id, item.productGlassID);
        });
        toast.success("Order confirmed successfully!");
        setTimeout(() => {
          // Reset location state and redirect
          navigate("/order", { replace: true, state: {} });
        }, 1000);
        clearTimeout();
      } else {
        toast.error("Order failed");
      }
    } catch (err) {
      toast.error("Order failed");
    }
  };
  

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("UserInfo"));
    if (!user) {
      window.location.href = "/login";
    }

    if (typePayment === "oneItem") {
      paymentOneItem(data, orderData, productGlassData);
    } else if (typePayment === "allItem") {
      paymentAllItem(cartData);
    } else {
      setLoading(false);
      setError("Not found data");
    }
  }, [data, orderData, productGlassData, typePayment]);

  function paymentOneItem(data, orderData, productGlassData) {
    if (data && orderData && productGlassData) {
      const orderObject = {
        accountID: orderData.accountID,
        receiverAddress: orderData.receiverAddress,
        orderDate: orderData.orderDate,
        total: data.price,
        status: true,
        orderDetails: [
          {
            orderID: orderData.id,
            productGlassID: productGlassData.id,
            quantity: 1,
            total: data.price,
            name: data.name,
            image: "https://img.ebdcdn.com/product/frame/gray/mt6960_0.jpg?im=Resize,width=600,height=300,aspect=fill;UnsharpMask,sigma=1.0,gain=1.0&q=85",
            status: true,
            productGlassRequest: {
              eyeGlassID: data.id,
              leftLenID: data.lensData.id,
              rightLenID: data.lensData.id,
              accountID: orderData.accountID,
              sphereOD: data.odSphere,
              cylinderOD: data.odCylinder,
              axisOD: data.odAxis,
              sphereOS: data.osSphere,
              cylinderOS: data.osCylinder,
              axisOS: data.osAxis,
              addOD: data.addOD,
              addOS: data.addOS,
              pd: data.pdType,
              status: true,
            }
          }
        ]
      };

      const originalData = { ...orderObject };

      setOriginalObject(originalData);
      setPaymentObject(orderObject);
      setLoading(false);
    } else {
      setPaymentObject({});
      setLoading(false);
      setError("Not found data");
    }
  };

  function paymentAllItem(cartData) {
    if (cartData) {
      setOriginalAllObject(cartData);
      const allOrderObject = cartData.cartDetails.map((item) => ({
        productGlassID: item.productGlassID,
        quantity: item.totalPriceProductGlass,
        status: true,
      }));

      setPaymentAllObject(allOrderObject);
      setLoading(false);
    } else {
      setPaymentObject({});
      setLoading(false);
      setError("Not found data");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
      {typePayment === "oneItem" && (
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <ul className="mt-2 space-y-4">
            {originalObject.orderDetails.map((item, index) => (
              <li
                key={index}
                className="border p-4 rounded-lg shadow-sm flex flex-col md:flex-row items-start md:items-center"
              >
                <div className="bg-[#f5f5f5] h-40 content-center">
                  <img
                    className="object-cover w-full md:w-48 rounded-lg md:rounded-none md:rounded-s-lg"
                    src={item.image}
                    alt=""
                  />
                </div>
                <div className="flex flex-col md:ml-4 mt-4 md:mt-0">
                  <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {item.name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Price: ${item.total} x {item.quantity}
                  </p>
                  <h4 className="mb-2 text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                    Your Prescription
                  </h4>
                  <div className="grid grid-cols-4 gap-4">
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      OD Sphere: {item?.productGlassRequest?.sphereOD}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      OD Cylinder: {item?.productGlassRequest?.cylinderOD}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      OD Axis: {item?.productGlassRequest?.axisOD}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      OS Sphere: {item?.productGlassRequest?.sphereOS}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      OS Cylinder: {item?.productGlassRequest?.cylinderOS}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      OS Axis: {item?.productGlassRequest?.axisOS}
                    </p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                      PD Type: {item?.productGlassRequest?.pd}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-lg text-green-500 font-bold mt-4">
            Order Total: ${originalObject.orderDetails[0].total}
          </p>
          <button
            onClick={() => handleConfirm()}
            className="mt-4 bg-teal-500 text-white px-4 py-2 rounded"
          >
            Confirm Order
          </button>
        </div>
      )}
      {originalAllObject && originalAllObject.cartDetails && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>
          <ul className="space-y-4">
            {originalAllObject.cartDetails.map((item, index) => (
              <li
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-100 shadow-sm flex items-center"
              >
                <img
                  src="https://img.ebdcdn.com/product/frame/gray/mt6960_0.jpg?im=Resize,width=600,height=300,aspect=fill;UnsharpMask,sigma=1.0,gain=1.0&q=85"
                  alt="Glass"
                  className="w-32 h-20 object-cover rounded-lg mr-4"
                />
                <div>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">Glass:</span>{" "}
                    {item.eyeGlassName}
                  </p>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">Lens:</span>{" "}
                    {item.eyeGlassName}
                  </p>
                  <p className="text-lg text-gray-700">
                    <span className="font-semibold">Price:</span> $
                    {item.totalPriceProductGlass}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Delivery Address
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              name="address"
              id="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Enter your delivery address"
              required
            />
          </div>
          <p className="text-lg font-bold text-green-500 mt-6">
            Order Total: ${originalAllObject.totalPrice}
          </p>
          <button
            onClick={() => handleConfirmAllItem()}
            className="mt-4 w-40 bg-teal-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-teal-600 transition-colors"
          >
            Confirm Order
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default OrderConfirmation;
