import React from "react";

const Lenses = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lenses Management</h1>
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="border p-4">Lens ID</th>
            <th className="border p-4">Type</th>
            <th className="border p-4">Price</th>
            <th className="border p-4">Stock</th>
            <th className="border p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-4">#3001</td>
            <td className="border p-4">Single Vision</td>
            <td className="border p-4">$100</td>
            <td className="border p-4">50</td>
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

export default Lenses;
