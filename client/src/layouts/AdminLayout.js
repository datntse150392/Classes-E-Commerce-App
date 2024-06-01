import React from "react";
import Sidebar from "../components/Admin/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default AdminLayout;
