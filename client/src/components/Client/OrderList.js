import React from 'react';

const OrderList = ({ orders, handleOrderClick }) => {
  return (
    <div>
      {orders.map((order) => (
        <div
          key={order.id}
          className="mb-4 p-4 border rounded-lg cursor-pointer"
          onClick={() => handleOrderClick(order)}
        >
          <div className="flex justify-between">
            <span>Order Code: {order.code}</span>
            <span>
              Placed on: {new Date(order.orderDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
