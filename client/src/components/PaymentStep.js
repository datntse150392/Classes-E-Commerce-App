import React from "react";
import { Link } from "react-router-dom";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaPencilAlt,
} from "react-icons/fa";

const PaymentStep = () => {
  const products = [
    {
      id: 1,
      name: "MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch",
      price: 433.0,
      originalPrice: 1203.0,
      image: "https://via.placeholder.com/150",
      quantity: 1,
      color: "Black",
    },
    {
      id: 2,
      name: "Inateck 12.3-13 Inch MacBook Case Sleeve",
      price: 63.26,
      originalPrice: 186.0,
      image: "https://via.placeholder.com/150",
      quantity: 1,
      color: "Blue",
    },
    {
      id: 3,
      name: "Laptop Privacy Screen for 13 inch MacBook Pro & MacBook Air",
      price: 23.26,
      originalPrice: 129.0,
      image: "https://via.placeholder.com/150",
      quantity: 1,
      color: "Black",
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
      <h2 className="text-2xl font-bold mb-4">Payment</h2>
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div className="w-full lg:w-3/4">
          <form className="space-y-6">
            <div className="p-4 border rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method
              </label>
              <div className="mt-1">
                <div className="flex items-center mb-2">
                  <input
                    id="credit-card"
                    name="payment-method"
                    type="radio"
                    className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                  />
                  <label
                    htmlFor="credit-card"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Credit Card{" "}
                    <FaCcVisa className="inline ml-1 text-xl text-blue-600" />{" "}
                    <FaCcMastercard className="inline ml-1 text-xl text-red-600" />
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    id="paypal"
                    name="payment-method"
                    type="radio"
                    className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                  />
                  <label
                    htmlFor="paypal"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    PayPal{" "}
                    <FaCcPaypal className="inline ml-1 text-xl text-blue-600" />
                  </label>
                </div>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Billing Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  value="Same as shipping address"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm pr-10"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <FaPencilAlt className="text-gray-400" />
                </span>
              </div>
            </div>
          </form>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="text-primary hover:text-primary-dark"
            >
              Return to checkout
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/4">
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-medium mb-4">Your Order</h3>
            {products.map((product) => (
              <div key={product.id} className="flex items-center mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="ml-4">
                  <h4 className="text-sm font-medium">{product.name}</h4>
                  <p className="text-gray-600">
                    ${product.price.toFixed(2)}{" "}
                    <span className="line-through text-sm">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </p>
                  <p className="text-gray-600">Qty: {product.quantity}</p>
                </div>
              </div>
            ))}
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
            <div className="flex justify-between mb-4">
              <input
                type="text"
                placeholder="discount code"
                className="border rounded-md py-2 px-3 w-2/3 focus:outline-none focus:ring-primary focus:border-primary"
              />
              <button className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-200 ml-2">
                Apply
              </button>
            </div>
            <Link
              to="/confirmation"
              className="bg-primary text-white py-3 px-6 rounded-full font-semibold hover:bg-primary-dark transition duration-200 w-full text-center block"
            >
              Confirm Payment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;
