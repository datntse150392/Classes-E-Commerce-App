import React from 'react';

const CartPage = () => {
  const UserInfo = localStorage.getItem('UserInfo');

  if (!UserInfo) {
    window.location.href = '/login';
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6">
        <CartItems />
      </main>
      <PaymentDetails />
    </div>
  );
};

const CartItems = () => (
  <div className="space-y-4">
    {[{
      title: 'MacBook Pro M2 MNEJ3 2022 LLA 13.3 inch',
      price: 433.00,
      oldPrice: 1200.00,
      image: 'https://img.ebdcdn.com/product/frame/gray/mt6960_0.jpg?im=Resize,width=600,height=300,aspect=fill;UnsharpMask,sigma=1.0,gain=1.0&q=85'
    }, {
      title: 'Inateck 12.3-13 Inch MacBook Case Sleeve',
      price: 63.26,
      oldPrice: 85.00,
      image: 'https://img.ebdcdn.com/product/frame/gray/mt6960_0.jpg?im=Resize,width=600,height=300,aspect=fill;UnsharpMask,sigma=1.0,gain=1.0&q=85'
    }, {
      title: 'Laptop Privacy Screen for 13 inch MacBook Pro & MacBook Air',
      price: 23.26,
      oldPrice: 45.00,
      image: 'https://img.ebdcdn.com/product/frame/gray/mt6960_0.jpg?im=Resize,width=600,height=300,aspect=fill;UnsharpMask,sigma=1.0,gain=1.0&q=85'
    }].map((item, index) => (
      <div key={index} className="bg-white p-4 rounded-lg flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <div
            className="h-16 w-16 bg-cover bg-center mr-4"
            style={{ backgroundImage: `url(${item.image})` }}
          ></div>
          <div>
            <h4 className="text-lg font-semibold">{item.title}</h4>
            <div className="text-sm text-gray-600 line-through">${item.oldPrice.toFixed(2)}</div>
            <div className="text-lg text-gray-900">${item.price.toFixed(2)}</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-red-500 hover:text-red-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button className="px-2">-</button>
            <span className="px-2">1</span>
            <button className="px-2">+</button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const PaymentDetails = () => (
  <aside className="w-80 bg-white p-6 border-l">
    <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>$519.52</span>
      </div>
      <div className="flex justify-between">
        <span>Discount</span>
        <span>-$111.87</span>
      </div>
      <div className="flex justify-between">
        <span>Shipment cost</span>
        <span>$22.50</span>
      </div>
      <div className="flex justify-between font-semibold text-lg">
        <span>Grand Total</span>
        <span>$543.02</span>
      </div>
      <button className="w-full mt-4 bg-teal-500 text-white py-2 rounded-lg">Proceed to checkout</button>
    </div>
  </aside>
);

export default CartPage;
