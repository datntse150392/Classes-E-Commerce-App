import React, { useState, useEffect } from "react";

// IMPORT API SERVICES
import { useDashboardService, useEyeGlassService } from "../../services/index";

const Users = () => {
  // Data variables
  const [data, setData] = useState([]);

  // Behavior variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API variables
  const { getAllAccount } = useDashboardService();

  // Fetch all eye glass data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accountData] = await Promise.all([
          getAllAccount()
        ]);

        if (accountData !== null && accountData.data.length > 0) {
          setData(accountData.data);
          setLoading(false);
        } else {
          setLoading(false);
          setError('No data found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="border p-4 text-center">User ID</th>
            <th className="border p-4 text-center">Name</th>
            <th className="border p-4 text-center">Email</th>
            <th className="border p-4 text-center">Role</th>
            <th className="border p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td className="py-2 text-center">{index + 1}</td>
              <td className="py-2">{item.profiles.fullname || item.username}</td>
              <td className="py-2">{item.email}</td>
              <td className="py-2">{item.role.name}</td>
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

export default Users;
