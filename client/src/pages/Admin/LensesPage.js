import React, { useState, useEffect } from "react";

// IMPORT API SERVICES
import { useDashboardService, useEyeGlassService } from "../../services/index";

const Lenses = () => {
  // Data variables
  const [data, setData] = useState([]);

  // Behavior variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API variables
  const { getAllAccount, getAllOrder, getAllOrderDetail, getAllPayment, getAllProfile  } = useDashboardService();
  const { getAllLens } = useEyeGlassService();

  // Fetch all eye glass data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lensData] = await Promise.all([
          getAllLens()
        ]);

        if (lensData !== null && lensData.data.length > 0) {
          setData(lensData.data);
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
      <h1 className="text-2xl font-bold mb-4">Lenses Management</h1>
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="border p-4 text-center">Lens ID</th>
            <th className="border p-4 text-center">Type</th>
            <th className="border p-4 text-center">Price</th>
            <th className="border p-4 text-center">eyeReflactive</th>
            <th className="border p-4 text-center">Quantity</th>
            <th className="border p-4 text-center">Total Rate</th>
            <th className="border p-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td className="py-2 text-center">{index + 1}</td>
              <td className="py-2">{item.lensType.description}</td>
              <td className="py-2">$ {item.lensPrice}</td>
              <td className="py-2">{item.eyeReflactive.reflactiveName}</td>
              <td className="py-2">{item.quantity}</td>
              <td className="py-2">{item.rateCount}</td>
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

export default Lenses;
