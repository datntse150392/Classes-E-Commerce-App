import React, { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import {
  FaBoxOpen,
  FaClipboardList,
  FaBlog,
  FaUserFriends,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState("/");
  const [urlParam, setUrlParam] = useState('');
  const { state } = location || {}; // Access the passed state
  const { setToastMessage } = useToast();
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
  const handleLogout = () => {
    localStorage.removeItem("UserInfo");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleRedirect = (path) => {
    setUrlParam(path);
    navigate(path);
  }

  useEffect(() => {
    const getUrlParam = () => {
      const url = new URL(window.location.href); // Create URL object for parsing
      const param = url.pathname.split('/').slice(-1)[0]; // Extract param from path
      setUrlParam(param);
    };

    getUrlParam(); // Call initially to set initial state

    // Add event listener for URL changes (consider using a library for better support)
    window.addEventListener('popstate', getUrlParam); // Listen for popstate events

    return () => {
      window.removeEventListener('popstate', getUrlParam); // Clean up on unmount
    };
  }, [urlParam, state]); // Empty dependency array for effect to run only once on component mount
  
  return (
    <aside className="w-64 bg-white p-8 shadow-lg font-sans">
      <ul className="space-y-2">
        <li className={`cursor-pointer flex items-center p-3 rounded-md ${urlParam === "" ?
          "bg-teal-500 text-white" : "hover:bg-gray-100 text-gray-600"
          }`}>
          <AiFillHome className="mr-3" />
          <a href="/" className="flex-1">
            Homepage
          </a>
        </li>
        {UserInfo && (
          <>
          <li className={`cursor-pointer flex items-center p-3 rounded-md ${urlParam === "cart" ?
            "bg-teal-500 text-white" : "hover:bg-gray-100 text-gray-600"
            }`}>
            <FaBoxOpen className="mr-3" />
            <a href="/cart" className="flex-1">
              Cart
            </a>
          </li>
          <li className={`cursor-pointer flex items-center p-3 rounded-md ${urlParam === "order" ?
            "bg-teal-500 text-white" : "hover:bg-gray-100 text-gray-600"
            }`}>
            <FaBoxOpen className="mr-3" />
            <a href="/order" className="flex-1">
              Order
            </a>
          </li>
          </>
        )}
        {/* <li className="flex items-center p-3 rounded-md hover:bg-gray-100 text-gray-600">
          <FaClipboardList className="mr-3" />
          <a href="/collection" className="flex-1">
            Collection
          </a>
        </li>
        <li className="flex items-center p-3 rounded-md hover:bg-gray-100 text-gray-600">
          <FaBlog className="mr-3" />
          <a href="/blog" className="flex-1">
            Blog
          </a>
        </li>
        <li className="flex items-center p-3 rounded-md hover:bg-gray-100 text-gray-600">
          <FaUserFriends className="mr-3" />
          <a href="/about" className="flex-1">
            About Us
          </a>
        </li>
        <li className="flex items-center p-3 rounded-md hover:bg-gray-100 text-gray-600">
          <FaQuestionCircle className="mr-3" />
          <a href="/help" className="flex-1">
            Help
          </a>
        </li>
        <li className="flex items-center p-3 rounded-md hover:bg-gray-100 text-gray-600">
          <FaCog className="mr-3" />
          <a href="/setting" className="flex-1">
            Setting
          </a>
        </li> */}
        {UserInfo ? (
          <li className="cursor-pointer flex items-center p-3 rounded-md hover:bg-gray-100 text-gray-600">
            <FaSignOutAlt className="mr-3" />
            <a onClick={() => handleLogout()} className="flex-1">
              Log out
            </a>
          </li>
        ) : (
            <li className="cursor-pointer flex items-center p-3 rounded-md hover:bg-gray-100 text-gray-600">
              <Link to="/login">
                <FaSignOutAlt className="mr-3" />
              </Link>
              <Link to="/login" className="flex-1">
                Log In
              </Link>
            </li>
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
