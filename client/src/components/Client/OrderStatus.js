import React, { useEffect, useState } from 'react';
import { useEyeGlassService } from '../../services/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart, faCogs, faTruck, faBox, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  // API variables
  const { fetchOrderByAccountID, createPaymentUrl, updateOrder } = useEyeGlassService();

  // Behavior variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false);
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));

  if (!UserInfo) {
    window.location.href = '/';
  }

  useEffect(() => {
    const initOrderData = async () => {
      const response = await fetchOrderByAccountID(UserInfo.id);
      if (response && response.length > 0) {
        response.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        // not get order with total = 0 || status = false
        const initOrders = response.filter(order => order.total > 0 && order.status === true);
        setOrders(initOrders);
        setSelectedOrder(initOrders[0]);
        setLoading(false);
      } else {
        setLoading(false);
        setError('No data found');
      }
    };

    initOrderData();
  }, [reload]);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCreatePaymentUrl = async (data) => {
    const response = await createPaymentUrl(data);
    if (response && response._statusCode === 200) {
      window.open(response._data.paymentUrl, '_blank');
    } else {
      toast.error('Failed to create payment URL');
    }
  }

  const fakePaymentSuccessfully = async (data) => {
    const response = await createPaymentUrl(data);
    if (response && response._statusCode === 200) {
      const responseUpdateOrder = await updateOrder(data);
      if (responseUpdateOrder && responseUpdateOrder.id) {
        toast.success('Payment successfully');
        navigate('/payment-status', { state: { success: true, orderId: data.code } });
      }
    } else {
      toast.error('Failed to create payment URL');
      navigate('/payment-status', { state: { success: false, orderId: data.code } });
    }
  };

  const handleConvertToVND = (money) => {
    const formatted = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 9,
    }).format(money);
    return formatted;
  };

  const processStatus = [
    { name: 'Pending, Đợi thanh toán', color: 'gray', width: '16.6%', icon: faHourglassStart },
    { name: 'Processing, Đang xử lý', color: 'orange', width: '33.3%', icon: faCogs },
    { name: 'Shipping, Đang giao', color: 'blue', width: '50%', icon: faTruck },
    { name: 'Delivered, Đã giao', color: 'green', width: '66.6%', icon: faBox },
    { name: 'Completed, Đã nhận', color: 'teal', width: '83.3%', icon: faCheckCircle },
    { name: 'Canceled, Huỷ', color: 'red', width: '100%', icon: faTimesCircle },
  ];

  if (loading && !selectedOrder) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full">
        <h2 className="text-2xl font-semibold mb-4">Order Status</h2>
        {selectedOrder && (
          <div className="mt-8">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
              <div
                className="h-2.5 rounded-full"
                style={{
                  width: `${processStatus[selectedOrder.process].width}`,
                  backgroundColor: processStatus[selectedOrder.process].color,
                }}
              ></div>
            </div>
            <div className="flex justify-between mb-6">
              {processStatus.map((status, index) => (
                <div key={index} className="text-center">
                  <div
                    className="w-12 h-12 flex items-center justify-center rounded-full text-white mb-2"
                    style={{
                      backgroundColor: selectedOrder.process >= index ? status.color : "gray",
                    }}
                  >
                    <FontAwesomeIcon icon={status.icon} />
                  </div>
                  <span>{status.name.split(",")[1]}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-600 mb-4">
              Please wait, we are still processing your order. We will notify
              you for any changes in your order.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Order Code</span>
                <span>{selectedOrder.code}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Placed on</span>
                <span>
                  {new Date(selectedOrder.orderDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Sent to</span>
                <span>{selectedOrder.receiverAddress}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Payment Type</span>
                <span>Net Banking</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Transaction ID</span>
                <span>{selectedOrder.id}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Amount Paid</span>
                <span>${selectedOrder.total}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">Amount Paid (VNĐ)</span>
                <span>{handleConvertToVND(selectedOrder.total * 25450)}</span>
              </div>
            </div>
            {selectedOrder.process === 0 && (
              <>
                <button
                  onClick={() => handleCreatePaymentUrl(selectedOrder)}
                  className="bg-teal-500 text-white p-2 rounded mb-4 mr-4"
                >
                  Continue to Pay
                </button>
                <button
                  onClick={() => fakePaymentSuccessfully(selectedOrder)}
                  className="bg-teal-500 text-white p-2 rounded mb-4"
                >
                  Trigger Payment Successfully
                </button>
              </>
            )}
          </div>
        )}
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
    </div>
  );
};

export default OrderStatus;
