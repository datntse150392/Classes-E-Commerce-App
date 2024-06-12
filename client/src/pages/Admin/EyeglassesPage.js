import React from "react";

const Eyeglasses = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Eyeglasses Management</h1>
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="border p-4">Product ID</th>
            <th className="border p-4">Name</th>
            <th className="border p-4">Category</th>
            <th className="border p-4">Price</th>
            <th className="border p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-4">#2001</td>
            <td className="border p-4">Round Glasses</td>
            <td className="border p-4">Prescription</td>
            <td className="border p-4">$150</td>
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

export default Eyeglasses;
