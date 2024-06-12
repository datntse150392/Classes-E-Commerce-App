import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faBoxOpen,
  faShippingFast,
  faCalendarAlt,
  faEnvelope,
  faBell,
  faCog,
  faSignOutAlt,
  faGlasses,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col justify-between">
      <div>
        <div className="p-4 text-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <nav className="mt-10">
          <NavLink
            to="/admin"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
            end
          >
            <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />{" "}
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/orders"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={faBoxOpen} className="mr-2" /> Orders
          </NavLink>
          <NavLink
            to="/admin/eyeglasses"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={faGlasses} className="mr-2" /> Eyeglasses
          </NavLink>
          <NavLink
            to="/admin/lenses"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={faShippingFast} className="mr-2" /> Lenses
          </NavLink>
          <NavLink
            to="/admin/users"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" /> Users
          </NavLink>
          <NavLink
            to="/admin/calendar"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Calendar
          </NavLink>
          <NavLink
            to="/admin/messages"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Messages{" "}
            <span className="ml-2 bg-pink-600 text-white text-xs font-semibold rounded-full px-2 py-1">
              49
            </span>
          </NavLink>
          <NavLink
            to="/admin/notifications"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={faBell} className="mr-2" /> Notification
          </NavLink>
          <NavLink
            to="/admin/settings"
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
          >
            <FontAwesomeIcon icon={faCog} className="mr-2" /> Settings
          </NavLink>
        </nav>
      </div>
      <div className="p-4 bg-gray-800">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="rounded-full mr-4"
          />
          <div>
            <p>Charles</p>
            <p className="text-sm text-gray-400">DistroBoy Store</p>
          </div>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className="ml-auto text-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
