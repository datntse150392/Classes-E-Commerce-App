import React from "react";
import Header from "../components/Client/Header";
import Sidebar from "../components/Client/Sidebar";
import Footer from "../components/Client/Footer";
import { SearchContext } from '../context/SearchContext';

const ClientLayout = ({ children }) => {

  return (
    <SearchContext.Consumer>
      {({ search, setSearch }) => (
        <div className="flex flex-col min-h-screen">
          <Header search={search} setSearch={setSearch} />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-4">{children}</main>
          </div>
          <Footer />
        </div>
      )}
    </SearchContext.Consumer>
  );
};

export default ClientLayout;
