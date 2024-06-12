import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center">
          <div className="text-gray-600 mr-4">Thomas Anree</div>
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
