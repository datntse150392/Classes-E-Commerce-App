import React from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const navigate = useNavigate();
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
  const handleLogout = () => {
    localStorage.removeItem("UserInfo");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <header className="bg-white shadow">
      <ToastContainer />
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <div className="flex items-center">
          <div className="text-gray-600 mr-4">
            Welcome, {UserInfo?.username}
          </div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/unicourse-f4020.appspot.com/o/User%2F9334243.jpg?alt=media&token=86c8bccd-20f7-40e5-bb80-b2d5eb27fe17"
            alt="Admin"
            className="rounded-full h-12 w-12 object-cover mr-4"
          />
          <button
            onClick={() => handleLogout()}
            className="bg-teal-500 text-white p-2 rounded"
          >
            <i className="fa-solid fa-right-from-bracket"></i>{" "}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
