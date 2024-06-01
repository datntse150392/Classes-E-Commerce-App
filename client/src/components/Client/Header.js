import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold">VisionUp</div>
        <input
          type="text"
          className="border rounded p-2 w-1/2"
          placeholder="Search for products, vouchers, etc."
        />
        <div>
          <Link to="/login" className="mr-4">
            Log In
          </Link>
          <button className="bg-teal-500 text-white p-2 rounded">
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
