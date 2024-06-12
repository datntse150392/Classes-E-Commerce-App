import React from "react";

const Users = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="border p-4">User ID</th>
            <th className="border p-4">Name</th>
            <th className="border p-4">Email</th>
            <th className="border p-4">Role</th>
            <th className="border p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-4">#4001</td>
            <td className="border p-4">Alice Johnson</td>
            <td className="border p-4">alice@example.com</td>
            <td className="border p-4">Customer</td>
            <td className="border p-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Edit
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

export default Users;
