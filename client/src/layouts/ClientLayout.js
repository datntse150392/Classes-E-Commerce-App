import React from "react";
import Header from "../components/Client/Header";
import Sidebar from "../components/Client/Sidebar";
import Footer from "../components/Client/Footer";

const ClientLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default ClientLayout;
