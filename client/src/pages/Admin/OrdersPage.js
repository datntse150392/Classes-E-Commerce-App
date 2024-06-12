import React from "react";

const Orders = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Orders Management</h1>
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="border p-4">Order ID</th>
            <th className="border p-4">Customer</th>
            <th className="border p-4">Total</th>
            <th className="border p-4">Status</th>
            <th className="border p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-4">#1001</td>
            <td className="border p-4">John Doe</td>
            <td className="border p-4">$200</td>
            <td className="border p-4">Completed</td>
            <td className="border p-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                View
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded ml-2">
                Delete
              </button>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
