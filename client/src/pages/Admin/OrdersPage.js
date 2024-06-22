import React, { useState, useEffect } from "react";

// IMPORT API SERVICES
import { useDashboardService, useEyeGlassService } from "../../services/index";

const Orders = () => {
  // Data variables
  const [data, setData] = useState([]);
  const [accountData, setAccountData] = useState([]);
  const [tableData, setTableData] = useState([]);

  // Behavior variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API variables
  const { getAllAccount, getAllOrder, getAllOrderDetail, getAllPayment, getAllProfile, getAllOrderPageSize1000  } = useDashboardService();

  useEffect(() => {
    const fetchData = () => {
      Promise.all([
        getAllOrderPageSize1000(),
        getAllAccount(),
      ])
        .then(([ordersData, accountData]) => {
          if (ordersData && accountData) {
            // get order data has total > 0
            ordersData.data = ordersData.data.filter(order => order.total > 0);
            setData(ordersData.data);
            setAccountData(accountData.data);
            mappingData(ordersData.data, accountData.data);
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

  function mappingData(orders, accounts) {
    let tableData = [];
    orders.map(item => {
      accounts.map(account => {
        if (item.accountID === account.id) {
          tableData.push({
            id: item.id,
            accountName: account.profiles[0]?.fullname || account.username,
            accountID: item.accountID,
            orderDate: item.orderDate,
            status: item.status,
            senderAddress: item.senderAddress,
            receiverAddress: item.receiverAddress,
            code: item.code,
            process: item.process,
          });
        }
      });
    });
    tableData.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    setTableData(tableData);
  }

  const convertDateToString = (date) => {
    return new Date(date).toLocaleDateString();
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders Management</h1>
      <table className="w-full px-2 bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="py-2 text-center">Order ID</th>
            <th className="py-2 text-center">Customer</th>
            <th className="py-2 text-center">Date</th>
            <th className="py-2 text-center">Code</th>
            <th className="py-2 text-center">Sender Address</th>
            <th className="py-2 text-center">Receiver Address</th>
            <th className="py-2 text-center">Status</th>
            <th className="border p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={item.id}>
              <td className="py-2 text-center">{index + 1}</td>
              <td className="py-2">{item.accountName}</td>
              <td className="py-2">{convertDateToString(item.orderDate)}</td>
              <td className="py-2">{item.code}</td>
              <td className="py-2">{item.senderAddress}</td>
              <td className="py-2">{item.receiverAddress}</td>
              <td className="py-2">{item.status ? "Success" : "Fail"}</td>
              <td className="border text-center">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  View
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
