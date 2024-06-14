import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderConfirmation = () => {
  const [confirmed, setConfirmed] = useState(false);

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

  const handleConfirm = () => {
    setConfirmed(true);
    toast.success("Order confirmed successfully!");
    // Thực hiện các hành động khác như gửi dữ liệu đơn hàng đến server
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
      <div className="border p-4 rounded-lg">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        <ul className="mt-2">
          {order.items.map((item, index) => (
            <li key={index} className="border-b py-2">
              {item.name} - ${item.price} x {item.quantity}
            </li>
          ))}
        </ul>
        <p className="text-lg font-bold mt-4">Total: ${order.total}</p>
        <h2 className="text-xl font-semibold mt-4">Your Prescription</h2>
        <ul className="mt-2">
          <li>OD Sphere: {order.prescription.odSphere}</li>
          <li>OD Cylinder: {order.prescription.odCylinder}</li>
          <li>OD Axis: {order.prescription.odAxis}</li>
          <li>OS Sphere: {order.prescription.osSphere}</li>
          <li>OS Cylinder: {order.prescription.osCylinder}</li>
          <li>OS Axis: {order.prescription.osAxis}</li>
          <li>PD Type: {order.prescription.pdType ? "True" : "False"}</li>
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
