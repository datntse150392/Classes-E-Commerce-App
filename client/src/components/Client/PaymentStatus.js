import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentStatus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { success, orderId } = location.state || {};

  const handleContinueShopping = () => {
    navigate('/order'); // Replace with your shopping page route
  };

  useEffect(() => {
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        {success ? (
          <>
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-semibold mb-4">Payment Successful</h2>
            <p>Your order number is <strong>{orderId}</strong></p>
          </>
        ) : (
          <>
            <div className="text-red-500 text-6xl mb-4">✗</div>
            <h2 className="text-2xl font-semibold mb-4">Payment Failed</h2>
            <p>Your order number is <strong>{orderId}</strong></p>
          </>
        )}
        <button
          onClick={handleContinueShopping}
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default PaymentStatus;
