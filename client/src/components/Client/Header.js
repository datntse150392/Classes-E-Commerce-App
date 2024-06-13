import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Header = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
  const handleLogout = () => {
    localStorage.removeItem("UserInfo");
    alert("Logged out successfully");
    navigate("/");
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-2xl font-bold">VisionUp</div>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          className="border rounded p-2 w-1/2"
          placeholder="Search for products, vouchers, etc."
        />
        <div>
        {UserInfo ? (
            <span className="flex items-center justify-between">
              <div className="text-lg font-bold mr-4">Welcome, {UserInfo.username}</div>
              <button onClick={() => handleLogout()} className="bg-teal-500 text-white p-2 rounded">
                Log Out
              </button>
            </span>
        ) : (
              <>
                <Link to="/login" className="mr-4">
                  Log In
                </Link>
                <Link to="/signup" className="text-blue-500 hover:text-blue-700">
                  <button className="bg-teal-500 text-white p-2 rounded">
                    Sign Up
                  </button>
                </Link>
              </>
        )}
        </div>
      </div>
    </header>
  );
};

export default Header;
