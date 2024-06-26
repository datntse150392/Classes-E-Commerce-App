import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useToast } from "../../context/ToastContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '@fortawesome/fontawesome-free/css/all.css';

const Header = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const { setToastMessage } = useToast();
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
  const handleLogout = () => {
    localStorage.removeItem("UserInfo");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <header className="bg-white shadow">
      <ToastContainer />
      <div className="mx-auto flex items-center justify-between p-4">
        <div className="ml-4" style={{width: "8rem", height: "100%"}}>
          <img src="./logo1.png"
          
          alt="VisionUp Logo" className="h-full w-full" />{" "}
        </div>
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
              <div className="text-lg font-bold mr-4">
                Welcome, {UserInfo.username}
              </div>
              <button
                onClick={() => handleLogout()}
                className="bg-teal-500 text-white p-2 rounded"
              >
                <i className="fa-solid fa-right-from-bracket"></i>{" "}
              </button>
            </span>
          ) : (
            <>
              <Link to="/login" className="mr-4">
                <button className="bg-teal-500 text-white p-2 rounded">
                  <i className="fa fa-sign-in-alt" aria-hidden="true"></i>{" "}
                  {/* Icon for Sign Up */}
                </button>
                {/* Icon for Log In */}
              </Link>
              <Link to="/signup" className="text-blue-500 hover:text-blue-700">
                <button className="bg-teal-500 text-white p-2 rounded">
                  <i className="fa fa-user-plus" aria-hidden="true"></i>{" "}
                  {/* Icon for Sign Up */}
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
