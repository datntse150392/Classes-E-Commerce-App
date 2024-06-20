import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { step1 } from "../../assets";
import ConfirmDialog from "../Client/ConfirmDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORT API SERVICES
import { useEyeGlassService } from "../../services/index";

const CartStep = () => {
  // Data variables
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Behavior variables
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [error, setError] = useState(null);

  // API variables
  const { fetchCartByAccountID, fetchOrderByAccountID, deleteCart } = useEyeGlassService();

  if (!UserInfo) {
    window.location.href = '/login';
  }

  // Fetch all eye glass data and eye glass types
  useEffect(() => {
    const getCartAndOrder = async () => {
      if (UserInfo) {
        const [orderResponse, cartResponse] = await Promise.all([
          fetchOrderByAccountID(UserInfo.id),
          fetchCartByAccountID(UserInfo.id)
        ]);
        if (orderResponse && orderResponse.length > 0 && cartResponse && cartResponse.cartDetails.length > 0) {
          // Sort the cart by order date
          orderResponse.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
          setOrder(orderResponse);
          setCart(cartResponse);
          setLoading(false);
        } else {
          setLoading(false);
          setError('No data found');
        }
      }
    };

    getCartAndOrder(UserInfo);
  }, []);

  const handleChangeQuality = (product, type) => {
    if (type === "add") {
      if (product.quantity === 99) {
        return;
      }
      let newCart = {
        cartDetails: cart.cartDetails.map((item) => item.productGlassID === product.productGlassID ? { ...item, quantity: item.quantity + 1 } : item),
        totalItems: cart.totalItems + 1,
        totalPrice: cart.totalPrice + product.eyeGlassPrice + product.lensPrice
      };
      setCart(newCart);
    } else {
      if (product.quantity === 1) {
        return;
      }
      let newCart = {
        cartDetails: cart.cartDetails.map((item) => item.productGlassID === product.productGlassID ? { ...item, quantity: item.quantity - 1 } : item),
        totalItems: cart.totalItems - 1,
        totalPrice: cart.totalPrice - product.eyeGlassPrice - product.lensPrice
      }
      setCart(newCart);
    }
  }

  const handleDeleteCartItem = (product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  }

  const handleConfirmDelete = async () => {
    const response = await deleteCart(selectedProduct.accountID, selectedProduct.productGlassID);
    if (response) {
      toast.success("Item deleted successfully");
      setIsDialogOpen(false);
      setSelectedProduct(null);
      let newCart = {
        cartDetails: cart.cartDetails.filter((item) => item.productGlassID !== selectedProduct.productGlassID),
        totalItems: cart.totalItems - 1,
        totalPrice: cart.totalPrice - selectedProduct.eyeGlassPrice - selectedProduct.lensPrice
      }
      setCart(newCart);
    } else {
      toast.error("Failed to delete item");
      setIsDialogOpen(false);
      setSelectedProduct(null);
    }
  }

  const handleCheckout = () => {
    if (cart.cartDetails.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    navigate("/order-confirm", { state: { cartData: cart, typePayment : "allItem"} });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <div className="w-full flex justify-center items-center">
        <img className="h-[5em] flex items-center" src={step1} />
      </div>

      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div className="w-full lg:w-3/4">
          {cart && cart.cartDetails.map((product, index) => (
            <div
              key={index}
              className="flex items-center mb-4 p-4 border rounded-lg"
            >
              <img
                src="https://img.ebdcdn.com/product/frame/gray/mt6960_0.jpg?im=Resize,width=600,height=300,aspect=fill;UnsharpMask,sigma=1.0,gain=1.0&q=85"
                alt={product.eyeGlassName}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="ml-4">
                <h3 className="text-lg font-medium">Glass: {product.eyeGlassName}</h3>
                <p className="text-gray-600">
                  Price: ${product.eyeGlassPrice.toFixed(2)}
                </p>
                <h3 className="text-md font-medium">Lens: {product.lensName}</h3>
                <p className="text-gray-600">
                  Price: ${product.lensPrice.toFixed(2)}
                </p>
              </div>
              <div className="ml-auto flex items-center">
                <button onClick={() => handleDeleteCartItem(product)} className="p-2 text-red-600 hover:text-red-800">
                  <FaTrashAlt />
                </button>
                <div className="flex items-center border px-3 py-1 ml-4">
                  <button onClick={() => handleChangeQuality(product, "minus")} className="p-1 text-gray-600 hover:text-gray-800">
                    <FaMinus />
                  </button>
                  <span className="px-2">{product.quantity}</span>
                  <button onClick={() => handleChangeQuality(product, "add")} className="p-1 text-gray-600 hover:text-gray-800">
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
              <span>${cart.totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipment cost</span>
              <span>$20.00</span>
            </div>
            <div className="flex justify-between font-bold mb-4">
              <span>Grand Total</span>
              <span>${(cart.totalPrice + 20).toFixed(2)}</span>
            </div>
            <a
              onClick={() => handleCheckout()}
              className="cursor-pointer bg-primary text-white py-3 px-6 rounded-full font-semibold hover:bg-primary-dark transition duration-200 w-full text-center block"
            >
              Proceed to checkout
            </a>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this item?"
      />
    </div>
  );
};

export default CartStep;
