import React from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { step1 } from "../../assets";
const CartStep = () => {
  const products = [
    {
      id: 1,
      name: "MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch",
      price: 433.0,
      originalPrice: 1203.0,
      image: "https://via.placeholder.com/150",
      quantity: 1,
      color: "Black",
      delivery: "Free Delivery",
      stock: "In Stock",
      guaranteed: "Guaranteed",
    },
    {
      id: 2,
      name: "Inateck 12.3-13 Inch MacBook Case Sleeve",
      price: 63.26,
      originalPrice: 186.0,
      image: "https://via.placeholder.com/150",
      quantity: 1,
      color: "Blue",
      delivery: "Free Delivery",
      stock: "In Stock",
      guaranteed: "Guaranteed",
    },
    {
      id: 3,
      name: "Laptop Privacy Screen for 13 inch MacBook Pro & MacBook Air",
      price: 23.26,
      originalPrice: 129.0,
      image: "https://via.placeholder.com/150",
      quantity: 1,
      color: "Black",
      delivery: "Free Delivery",
      stock: "In Stock",
      guaranteed: "Guaranteed",
    },
  ];

  const subtotal = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const discount = 111.87;
  const shipmentCost = 22.5;
  const grandTotal = subtotal - discount + shipmentCost;

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <div className="w-full flex justify-center items-center">
        <img className="h-[5em] flex items-center" src={step1} />
      </div>

      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div he className="w-full lg:w-3/4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center mb-4 p-4 border rounded-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-600">
                  ${product.price.toFixed(2)}{" "}
                  <span className="line-through text-sm">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </p>
                <p className="text-gray-600">{product.color}</p>
                <p className="text-gray-600">{product.delivery}</p>
                <p className="text-gray-600">{product.stock}</p>
                <p className="text-gray-600">{product.guaranteed}</p>
              </div>
              <div className="ml-auto flex items-center">
                <button className="p-2 text-red-600 hover:text-red-800">
                  <FaTrashAlt />
                </button>
                <div className="flex items-center border px-3 py-1 ml-4">
                  <button className="p-1 text-gray-600 hover:text-gray-800">
                    <FaMinus />
                  </button>
                  <span className="px-2">{product.quantity}</span>
                  <button className="p-1 text-gray-600 hover:text-gray-800">
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full lg:w-1/4">
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-medium mb-4">Payment Details</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipment cost</span>
              <span>${shipmentCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold mb-4">
              <span>Grand Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              className="bg-primary text-white py-3 px-6 rounded-full font-semibold hover:bg-primary-dark transition duration-200 w-full text-center block"
            >
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartStep;
