import React from 'react';

const Pagination = ({ currentPage, paginate, ordersPerPage, totalOrders }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-4">
      <button
        className="bg-teal-500 text-white p-2 w-12 rounded"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <i className="fa-solid fa-circle-chevron-left"></i>
      </button>
      <span className="mx-6 content-center">Page {currentPage}</span>
      <button
        className="bg-teal-500 text-white p-2 w-12 rounded"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === pageNumbers.length}
      >
        <i className="fa-solid fa-circle-chevron-right"></i>
      </button>
    </div>
  );
};

export default Pagination;
