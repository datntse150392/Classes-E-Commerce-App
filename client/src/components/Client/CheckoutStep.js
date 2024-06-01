import React from "react";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { step2 } from "../../assets";

const CheckoutStep = () => {
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
      <div className="w-full flex justify-center items-center">
        <img className="h-[5em] flex items-center" src={step2} />
      </div>

      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div className="w-full lg:w-3/4">
          <form className="space-y-6">
            <div className="p-4 border rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User
              </label>
              <input
                type="text"
                value="Jimmy Smith"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm mb-4"
                disabled
              />
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ship to
              </label>
              <div className="relative">
                <input
                  type="text"
                  value="HubSpot, 25 First Street, Cambridge MA 02141, United States"
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm pr-10"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <FaPencilAlt className="text-gray-400" />
                </span>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Method
              </label>
              <div className="mt-1">
                <div className="flex items-center mb-2">
                  <input
                    id="free-shipping"
                    name="shipping-method"
                    type="radio"
                    className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                  />
                  <label
                    htmlFor="free-shipping"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Free Shipping (7-30 business days) - $0
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    id="regular-shipping"
                    name="shipping-method"
                    type="radio"
                    className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                  />
                  <label
                    htmlFor="regular-shipping"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Regular Shipping (3-14 business days) - $7.50
                  </label>
                </div>
                <div className="flex items-center mb-2">
                  <input
                    id="express-shipping"
                    name="shipping-method"
                    type="radio"
                    className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                  />
                  <label
                    htmlFor="express-shipping"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    Express Shipping (1-3 business days) - $22.50
                  </label>
                </div>
              </div>
            </div>
          </form>
          <div className="mt-6">
            <Link to="/cart" className="text-primary hover:text-primary-dark">
              Return to cart
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
              to="/payment"
              className="bg-primary text-white py-3 px-6 rounded-full font-semibold hover:bg-primary-dark transition duration-200 w-full text-center block"
            >
              Continue to pay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutStep;
