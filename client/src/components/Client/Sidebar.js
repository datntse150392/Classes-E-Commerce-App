import React, { useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
  const handleLogout = () => {
    localStorage.removeItem("UserInfo");
    alert("Logged out successfully");
    navigate("/");
  };
  
  return (
    <aside className="w-64 bg-white p-8 shadow-lg font-sans">
      <ul className="space-y-2">
        <li className="bg-teal-500 text-white flex items-center p-3 rounded-md">
          <AiFillHome className="mr-3" />
          <a href="/" className="flex-1">
            Homepage
          </a>
        </li>
        <li className="flex items-center p-3 rounded-md hover:bg-gray-100 text-gray-600">
          <FaBoxOpen className="mr-3" />
          <a href="/product" className="flex-1">
            Product
          </a>
        </li>
        <li className="flex items-center p-3 rounded-md hover:bg-gray-100 text-gray-600">
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
        </li>
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
