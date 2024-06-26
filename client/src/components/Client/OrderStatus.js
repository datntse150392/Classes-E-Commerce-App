import React, { useEffect, useState } from 'react';
import { useEyeGlassService } from '../../services/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart, faCogs, faTruck, faBox, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5); // Number of orders per page
  const navigate = useNavigate();
  const orderCode = JSON.parse(localStorage.getItem("code"));

  // API variables
  const { fetchOrderByAccountID, createPaymentUrl, updateOrder } = useEyeGlassService();

  // Behavior variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));

  if (!UserInfo) {
    window.location.href = '/';
  }

  useEffect(() => {
    const initOrderData = async () => {
      const response = await fetchOrderByAccountID(UserInfo.id);
      if (response && response.length > 0) {
        response.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        const initOrders = response.filter(order => order.total > 0 && order.status === true);
        setOrders(initOrders);
        setFilteredOrders(initOrders);
        setSelectedOrder(initOrders[0]);
        setLoading(false);
      } else {
        setLoading(false);
        setError('No data found');
      }
    };

    getResponseFromVnPay();
    initOrderData();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCreatePaymentUrl = async (data) => {
    localStorage.removeItem('orderData');
    localStorage.setItem('orderData', JSON.stringify(data));
    const response = await createPaymentUrl(data);
    if (response && response._statusCode === 200) {
      window.location.href = response._data.paymentUrl;
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

  async function getResponseFromVnPay() {
    const url = window.location.href;
    const orderData = JSON.parse(localStorage.getItem('orderData'));
    const urlParams = new URLSearchParams(url);
    if (localStorage !== undefined && orderData !== undefined && urlParams.get('vnp_ResponseCode') === '00') {
      localStorage.removeItem('orderData');
      window.history.replaceState(
        {},
        document.title,
        window.location.protocol + '//' + window.location.host
      );
      const responseUpdateOrder = await updateOrder(orderData);
      if (responseUpdateOrder && responseUpdateOrder.id) {
        navigate('/payment-status', { state: { success: true, orderId: orderData.code } });
      }
    }
  }

  const processStatus = [
    { name: 'Pending, Đợi thanh toán', color: 'gray', width: '16.6%', icon: faHourglassStart },
    { name: 'Processing, Đang xử lý', color: 'orange', width: '33.3%', icon: faCogs },
    { name: 'Shipping, Đang giao', color: 'blue', width: '50%', icon: faTruck },
    { name: 'Delivered, Đã giao', color: 'green', width: '66.6%', icon: faBox },
    { name: 'Completed, Đã nhận', color: 'teal', width: '83.3%', icon: faCheckCircle },
    { name: 'Canceled, Huỷ', color: 'red', width: '100%', icon: faTimesCircle },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const filtered = orders.filter(order =>
      order.code.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredOrders(filtered);
    setCurrentPage(1); // Reset to the first page on new search
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
        <input
          type="text"
          placeholder="Search by order code"
          value={searchQuery}
          onChange={handleSearchChange}
          className="mb-4 p-2 border rounded"
        />
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
                      backgroundColor:
                        selectedOrder.process >= index
                          ? processStatus[selectedOrder.process].color
                          : "gray",
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
            <div className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-600">
                    Transaction ID
                  </span>
                  <span className="text-gray-800">{selectedOrder.id}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-600">
                    Order Code
                  </span>
                  <span className="text-gray-800">{selectedOrder.code}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-600">Sent to</span>
                  <span className="text-gray-800">
                    {selectedOrder.receiverAddress}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-600">
                    Payment Type
                  </span>
                  <span className="text-gray-800">Net Banking</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-600">
                    Amount Paid
                  </span>
                  <span className="text-gray-800">${selectedOrder.total}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-600">Placed on</span>
                  <span className="text-gray-800">
                    {new Date(selectedOrder.orderDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-600">
                    Amount Paid (VNĐ)
                  </span>
                  <span className="text-gray-800">
                    {handleConvertToVND(selectedOrder.total * 25450)}
                  </span>
                </div>
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
                {/* <button
                  onClick={() => fakePaymentSuccessfully(selectedOrder)}
                  className="bg-teal-500 text-white p-2 rounded mb-4"
                >
                  Trigger Payment Successfully
                </button> */}
              </>
            )}
          </div>
        )}
        {currentOrders.map((order) => (
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
        <div className="flex justify-center mt-4">
          <button
            className="bg-teal-500 text-white p-2 w-12 rounded"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="fa-solid fa-circle-chevron-left"></i>
          </button>
          <span className="mx-6 content-center">Page {currentPage}</span>
          <button
            className="bg-teal-500 text-white p-2 w-12 rounded"
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastOrder >= filteredOrders.length}
          >
            <i className="fa-solid fa-circle-chevron-right"></i>{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;
