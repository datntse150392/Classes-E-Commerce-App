import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORT API SERVICES
import { useEyeGlassService } from "../../services/index";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, orderData, productGlassData, cartData, typePayment } = location.state || {};
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));

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

  const handleConfirm = async () => {
    try {
      const [responseCreateOrderProduct] = await Promise.all([
        createOrderProduct(paymentObject),
      ]);

      if (responseCreateOrderProduct?.id) {
        toast.success("Order confirmed successfully!");
        await deleteOrder(paymentObject.orderDetails[0].orderID);
        setTimeout(() => {
          window.location.href = "/order";
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
          window.location.href = "/order";
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
          <ul className="mt-2">
            {originalObject.orderDetails.map((item, index) => (
              <li key={index} className="border-b py-2">
                {item.name} - ${item.total} x {item.quantity}
              </li>
            ))}
          </ul>
          <p className="text-lg font-bold mt-4">Total: ${originalObject.orderDetails[0].total}</p>
          <h2 className="text-xl font-semibold mt-4">Your Prescription</h2>
          <ul className="mt-2">
            <li>OD Sphere: {originalObject?.orderDetails[0]?.productGlassRequest?.sphereOD}</li>
            <li>OD Cylinder: {originalObject?.orderDetails[0]?.productGlassRequest?.cylinderOD}</li>
            <li>OD Axis: {originalObject?.orderDetails[0]?.productGlassRequest?.axisOD}</li>
            <li>OS Sphere: {originalObject?.orderDetails[0]?.productGlassRequest?.sphereOS}</li>
            <li>OS Cylinder: {originalObject?.orderDetails[0]?.productGlassRequest?.cylinderOS}</li>
            <li>OS Axis: {originalObject?.orderDetails[0]?.productGlassRequest?.axisOS}</li>
            <li>PD Type: {originalObject?.orderDetails[0]?.productGlassRequest?.pd}</li>
          </ul>
          <button
            onClick={handleConfirm}
            className="mt-4 bg-teal-500 text-white px-4 py-2 rounded"
          >
            Confirm Order
          </button>
        </div>
      )}
      {originalAllObject && originalAllObject.cartDetails && (
        <div className="border p-4 rounded-lg">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <ul className="mt-2">
            {originalAllObject.cartDetails.map((item, index) => (
              <>
                <li key={index} className="border-b py-2">
                  <p>Glass: {item.eyeGlassName}</p>
                  <p>Lens: {item.eyeGlassName}</p>
                  <p>Price: ${item.totalPriceProductGlass}</p>
                </li>
              </>
            ))}
          </ul>
          <div>
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your address
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              name="address"
              id="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <p className="text-lg font-bold mt-4">Total: ${originalAllObject.totalPrice}</p>
          <button
            onClick={() => handleConfirmAllItem()}
            className="mt-4 bg-teal-500 text-white px-4 py-2 rounded"
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
