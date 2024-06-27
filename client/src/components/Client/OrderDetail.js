import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassStart, faCogs, faTruck, faBox, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const OrderDetail = ({ selectedOrder, handleCreatePaymentUrl, handleConvertToVND }) => {
  const processStatus = [
    { name: 'Pending, Đợi thanh toán', color: 'gray', width: '16.6%', icon: faHourglassStart },
    { name: 'Processing, Đang xử lý', color: 'orange', width: '33.3%', icon: faCogs },
    { name: 'Shipping, Đang giao', color: 'blue', width: '50%', icon: faTruck },
    { name: 'Delivered, Đã giao', color: 'green', width: '66.6%', icon: faBox },
    { name: 'Completed, Đã nhận', color: 'teal', width: '83.3%', icon: faCheckCircle },
    { name: 'Canceled, Huỷ', color: 'red', width: '100%', icon: faTimesCircle },
  ];

  return (
    <div className="mt-8">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div
          className="h-2.5 rounded-full"
          style={{
            width: `${processStatus[selectedOrder.process].width}`,
            backgroundColor: processStatus[selectedOrder.process].color,
          }}
        ></div>
      </div>
      <div className="flex justify-between mb-6">
        {processStatus.map((status, index) => (
          <div key={index} className="text-center">
            <div
              className="w-12 h-12 flex items-center justify-center rounded-full text-white mb-2"
              style={{
                backgroundColor:
                  selectedOrder.process >= index
                    ? processStatus[selectedOrder.process].color
                    : "gray",
              }}
            >
              <FontAwesomeIcon icon={status.icon} />
            </div>
            <span>{status.name.split(",")[1]}</span>
          </div>
        ))}
      </div>
      <p className="text-gray-600 mb-4">
        Please wait, we are still processing your order. We will notify
        you for any changes in your order.
      </p>
      <div className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-600">
              Transaction ID
            </span>
            <span className="text-gray-800">{selectedOrder.id}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-600">
              Order Code
            </span>
            <span className="text-gray-800">{selectedOrder.code}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-600">Sent to</span>
            <span className="text-gray-800">
              {selectedOrder.receiverAddress}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-600">
              Payment Type
            </span>
            <span className="text-gray-800">Net Banking</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-600">
              Amount Paid
            </span>
            <span className="text-gray-800">${selectedOrder.total}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-600">Placed on</span>
            <span className="text-gray-800">
              {new Date(selectedOrder.orderDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-600">
              Amount Paid (VNĐ)
            </span>
            <span className="text-gray-800">
              {handleConvertToVND(selectedOrder.total * 25450)}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Order Details</h3>
          {selectedOrder.orderDetails.map(detail => (
            <div key={detail.id} className="border-t py-2">
              <div className="flex justify-between">
                <span>Product Glass ID: {detail.productGlassID}</span>
                <span>Quantity: {detail.quantity}</span>
                <span>Status: {detail.status ? 'Completed' : 'Pending'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedOrder.process === 0 && (
        <>
          <button
            onClick={() => handleCreatePaymentUrl(selectedOrder)}
            className="bg-teal-500 text-white p-2 rounded mb-4 mr-4"
          >
            Continue to Pay
          </button>
        </>
      )}
    </div>
  );
};

export default OrderDetail;
