import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";
import Header from "../components/Admin/Header";
import { useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();
  let UserInfo = null;

  try {
    UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
  } catch (error) {
    console.error("Error parsing user info from localStorage", error);
  }

  if (!UserInfo || UserInfo.roleID !== 2) {
    window.location.href = "/";
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6 bg-gray-100 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
