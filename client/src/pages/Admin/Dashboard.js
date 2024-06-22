import React, { useState, useEffect } from "react";

// IMPORT API SERVICES
import { useDashboardService, useEyeGlassService } from "../../services/index";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const data = [
  { name: "Jan", orders: 30, revenue: 2400 },
  { name: "Feb", orders: 20, revenue: 1398 },
  { name: "Mar", orders: 50, revenue: 9800 },
  { name: "Apr", orders: 40, revenue: 3908 },
  { name: "May", orders: 70, revenue: 4800 },
  { name: "Jun", orders: 60, revenue: 3800 },
  { name: "Jul", orders: 80, revenue: 4300 },
];

const pieData = [
  { name: "Prescription Glasses", value: 400 },
  { name: "Sunglasses", value: 300 },
  { name: "Contact Lenses", value: 300 },
  { name: "Accessories", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {

  // Data variables
  const [accounts, setAccounts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [payments, setPayments] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [dataMetrics, setDataMetrics] = useState({});
  const [products, setProducts] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [topSellProducts, setTopSellProducts] = useState([]);

  // Behavior variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API variables
  const { getAllAccount, getAllOrder, getAllOrderDetail, getAllPayment, getAllProfile  } = useDashboardService();
  const { fetchAllEyeGlass } = useEyeGlassService();

  useEffect(() => {
    const fetchData = () => {
      Promise.all([
        getAllAccount(),
        getAllOrder(),
        getAllOrderDetail(),
        getAllPayment(),
        getAllProfile(),
        fetchAllEyeGlass()
      ])
        .then(([accounts, orders, orderDetails, payments, profiles, eyeGlass]) => {
          if (accounts && orders && orderDetails && payments && profiles && eyeGlass) {
            setAccounts(accounts.data);
            // get order data has total > 0
            orders.data = orders.data.filter(order => order.total > 0);
            setOrders(orders.data);
            setOrderDetails(orderDetails);
            setPayments(payments);
            setProfiles(profiles._data);
            setProducts(eyeGlass.data);
            calculateMetrics(payments)
            mappingDatePaymentWithAccount(payments, accounts.data)
            getTopThreeSellProducts(orderDetails, eyeGlass.data)
            setLoading(false);
          } else {
            setError("Failed to fetch data");
            setLoading(false);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setError("Failed to fetch data");
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // LOGIC TO CALCULATE DASHBOARD METRICS
  function calculateMetrics(data) {
    let totalOrders = 0;
    let totalAmount = 0;
    let totalSuccessfulPayments = 0;
    let totalFailedPayments = 0;
    let totalAmountByPaymentMethod = {};
  
    data.forEach((item) => {
      totalOrders += 1;
      totalAmount += item.totalAmount;
  
      if (item.status) {
        totalSuccessfulPayments += 1;
      } else {
        totalFailedPayments += 1;
      }
  
      if (!totalAmountByPaymentMethod[item.paymentMethod]) {
        totalAmountByPaymentMethod[item.paymentMethod] = 0;
      }
      totalAmountByPaymentMethod[item.paymentMethod] += item.totalAmount;
    });
  
    setDataMetrics({
      totalOrders,
      totalAmount,
      totalSuccessfulPayments,
      totalFailedPayments,
      totalAmountByPaymentMethod
    });
  };

  // Mapping data payments with accountID to get account.profiles.fullname
  function mappingDatePaymentWithAccount(payments, accounts) {
    let recentTransactions = [];
    payments.map(payment => {
      accounts.map(account => {
        if (payment.accountID === account.id) {
          recentTransactions.push({
            id: payment.id,
            account: account?.username,
            totalAmount: payment?.totalAmount,
            status: payment?.status,
            paymentMethod: payment?.paymentMethod,
            date: payment?.date
          });
        }
      });
    });
    recentTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    setRecentTransactions(recentTransactions);
  }

  const convertDateToString = (date) => {
    return new Date(date).toLocaleDateString();
  }

  function getTopThreeSellProducts(orderDetails, products) {
    // Mapping data orderDetails with products
    orderDetails.map(orderDetail => {
      products.map(product => {
        if (orderDetail.productGlassID === product.eyeGlassTypeID) {
          orderDetail.name = product.name;
        }
      });
    });
    let topSellProducts = orderDetails.sort((a, b) => b.quantity - a.quantity).slice(0, 3);
    setTopSellProducts(topSellProducts);
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-600">Total Orders</p>
          <p className="text-3xl font-bold">{dataMetrics.totalOrders}</p>
          {/* <p className="text-green-500">+12% from last month</p> */}
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-600">Total Products</p>
          <p className="text-3xl font-bold">{products.length}</p>
          {/* <p className="text-green-500">+8% from last month</p> */}
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-600">Total Revenue</p>
          <p className="text-3xl font-bold">${dataMetrics.totalAmount}</p>
          {/* <p className="text-red-500">-5% from last month</p> */}
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-600">Cancelled Orders</p>
          <p className="text-3xl font-bold">{dataMetrics.totalFailedPayments}</p>
          {/* <p className="text-red-500">-2% from last month</p> */}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4 lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Orders and Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orders" stroke="#8884d8" />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Product Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-2">Order ID</th>
                <th className="text-left py-2">Customer</th>
                <th className="text-left py-2">Total</th>
                <th className="text-left py-2">Method</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((item, index) => (
                <tr key={item.id}>
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">{item.account}</td>
                  <td className="py-2">${item.totalAmount}</td>
                  <td className="py-2">{item.paymentMethod}</td>
                  <td className="py-2">{convertDateToString(item.date)}</td>
                  <td className="py-2">{item.status ? "Success" : "Fail"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
          <ul>
            {/* {topSellProducts.map((item, index) => (
              <li key={item.id} className="py-2">
                <div className="flex items-center">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="Product"
                    className="rounded mr-4"
                  />
                  <div>
                    <p>{item.name}</p>
                    <p className="text-sm text-gray-400">{item.name}</p>
                  </div>
                </div>
              </li>
            ))} */}
            <li className="py-2">
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Product"
                  className="rounded mr-4"
                />
                <div>
                  <p>Prescription Glasses</p>
                  <p className="text-sm text-gray-400">$150</p>
                </div>
              </div>
            </li>
            <li className="py-2">
              <div className="flex items-center">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Product"
                  className="rounded mr-4"
                />
                <div>
                  <p>Sunglasses</p>
                  <p className="text-sm text-gray-400">$120</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
