import React from "react";
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
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-600">Total Orders</p>
          <p className="text-3xl font-bold">1,500</p>
          <p className="text-green-500">+12% from last month</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-600">Total Products</p>
          <p className="text-3xl font-bold">350</p>
          <p className="text-green-500">+8% from last month</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-600">Total Revenue</p>
          <p className="text-3xl font-bold">$45,000</p>
          <p className="text-red-500">-5% from last month</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-gray-600">Cancelled Orders</p>
          <p className="text-3xl font-bold">50</p>
          <p className="text-red-500">-2% from last month</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left py-2">Order ID</th>
                <th className="text-left py-2">Customer</th>
                <th className="text-left py-2">Total</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">#1001</td>
                <td className="py-2">John Doe</td>
                <td className="py-2">$200</td>
                <td className="py-2">Completed</td>
              </tr>
              <tr>
                <td className="py-2">#1002</td>
                <td className="py-2">Jane Smith</td>
                <td className="py-2">$300</td>
                <td className="py-2">Pending</td>
              </tr>
              <tr>
                <td className="py-2">#1003</td>
                <td className="py-2">Bob Johnson</td>
                <td className="py-2">$150</td>
                <td className="py-2">Cancelled</td>
              </tr>
              <tr>
                <td className="py-2">#1004</td>
                <td className="py-2">Alice Brown</td>
                <td className="py-2">$400</td>
                <td className="py-2">Completed</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
          <ul>
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
