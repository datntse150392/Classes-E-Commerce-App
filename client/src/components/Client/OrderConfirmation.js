import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORT API SERVICES
import { useEyeGlassService } from "../../services/index";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, orderData } = location.state || {}; // Access the passed state
  const [paymentObject, setPaymentObject] = useState({}); // [1]
  const [originalObject, setOriginalObject] = useState({}); // [2

  const order = {
    items: [
      { name: "Eyeglass Frame", price: 50, quantity: 1 },
      { name: "Lenses", price: 50, quantity: 1 },
    ],
    total: 100,
    prescription: {
      odSphere: 0,
      odCylinder: 0,
      odAxis: 0,
      osSphere: 0,
      osCylinder: 0,
      osAxis: 0,
      pdType: false,
    },
  };

  // API variables
  const { createOrderProduct } = useEyeGlassService();

  const handleConfirm = async () => {
    const [responseCreateOrderProduct] = await Promise.all([createOrderProduct(paymentObject)]);
      if ( responseCreateOrderProduct &&
        responseCreateOrderProduct.id !== undefined
      ) {
        toast.success("Order confirmed successfully!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
        clearTimeout();
      } else {
        toast.error("Order failed");
      }
  };

  useEffect(() => {
    if (data && orderData) {
      const orderObject = {
        accountID: orderData.accountID,
        receiverAddress: orderData.receiverAddress,
        orderDate: orderData.orderDate,
        status: true,
        orderDetails: [
          {
            orderID: orderData.id,
            productGlassID: data.id,
            quantity: 1,
            total: data.price,
            status: true,
            productGlassRequest: {
              eyeGlassID: data.id,
              leftLenID: 39,
              rightLenID: 39,
              accountID: orderData.accountID,
              sphereOD: data.odSphere,
              cylinderOD: data.odCylinder,
              axisOD: data.odAxis,
              sphereOS: data.osSphere,
              cylinderOS: data.osCylinder,
              axisOS: data.osAxis,
              pd: 10,
              status: true,
            }
          }
        ]
      };

      const originalData = {
        accountID: orderData.accountID,
        receiverAddress: orderData.receiverAddress,
        orderDate: orderData.orderDate,
        status: true,
        orderDetails: [
          {
            orderID: orderData.id,
            productGlassID: data.id,
            quantity: 1,
            total: data.price,
            status: true,
            name: data.name,
            images: data.eyeGlassImages,
            selectedSize: data.selectedSize,
            productGlassRequest: {
              eyeGlassID: data.id,
              leftLenID: 39,
              rightLenID: 39,
              accountID: orderData.accountID,
              sphereOD: data.odSphere,
              cylinderOD: data.odCylinder,
              axisOD: data.odAxis,
              sphereOS: data.osSphere,
              cylinderOS: data.osCylinder,
              axisOS: data.osAxis,
              pd: data.pdType,
              status: true,
            }
          }
        ]
      };
      setOriginalObject(originalData);
      setPaymentObject(orderObject);
    } else {
      // Xử lý khi không có dữ liệu
      setPaymentObject({});
    }
  }, [data, orderData]);

  if (!paymentObject?.accountID || !originalObject?.accountID) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
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
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Confirm Payment
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderConfirmation;
