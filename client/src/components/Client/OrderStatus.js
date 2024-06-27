import React, { useEffect, useState } from 'react';
import { useEyeGlassService } from '../../services/index';
import OrderList from './OrderList';
import OrderDetail from './OrderDetail';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OrderStatus = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5); 
  const navigate = useNavigate();
  const orderCode = JSON.parse(localStorage.getItem("code"));

  const { fetchAllOrder, fetchOrderByAccountID, createPaymentUrl, updateOrder } = useEyeGlassService();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));

  if (!UserInfo) {
    window.location.href = '/';
  }

  useEffect(() => {
    const initOrderData = async () => {
      // const response = await fetchOrderByAccountID(UserInfo.id);
      const response = await fetchAllOrder();
      if (response && response.data.length > 0) {
        const userOrders = response.data.filter(order => order.accountID === UserInfo.id);
        userOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        const initOrders = userOrders.filter(order => order.total > 0 && order.status === true);
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    const filtered = orders.filter(order =>
      order.code.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredOrders(filtered);
    setCurrentPage(1); 
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
          <OrderDetail
            selectedOrder={selectedOrder}
            handleCreatePaymentUrl={handleCreatePaymentUrl}
            handleConvertToVND={handleConvertToVND}
          />
        )}
        <OrderList
          orders={currentOrders}
          handleOrderClick={handleOrderClick}
        />
        <Pagination
          currentPage={currentPage}
          paginate={paginate}
          ordersPerPage={ordersPerPage}
          totalOrders={filteredOrders.length}
        />
      </div>
    </div>
  );
};

export default OrderStatus;
