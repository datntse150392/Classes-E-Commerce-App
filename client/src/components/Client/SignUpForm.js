import React from "react";
import { FaGoogle, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// IMPORT API SERVICES
import { useAuthService } from "../../services/index";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Behavior variables
  const navigate = useNavigate();

  const { register } = useAuthService();

  const handleRegister = async (e) => {
    e.preventDefault();

    const canSubmit = validateForm();
    if (!canSubmit) {
      return;
    }
    
    const response = await register(username, password, email);
    if (response) {
      localStorage.setItem("UserInfo", JSON.stringify(response));
      toast.success("Register successful");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      toast.error("Register failed");
    }
  }

  function validateForm() {
    let emailInput = email;
    let usernameInput = username;
    let passwordInput = password;

    if (usernameInput.trim() === "" || passwordInput.trim() === "" || emailInput.trim() === "") {
      toast.error("Please fill all fields");
      return false;
    }
    return true;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-4">Sign Up</h2>
        <button className="w-full flex items-center justify-center py-3 border rounded-full text-gray-700 hover:bg-gray-100 mb-4">
          <FaGoogle className="mr-2 text-red-600" />
          <span className="text-lg font-medium">Sign Up using Google</span>
        </button>
        <div className="my-4 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-400">or sign Up with your email</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <form className="space-y-6">
          <div className="relative">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email"
              className="w-full py-4 pl-4 pr-4 border rounded-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              className="w-full py-4 pl-4 pr-4 border rounded-full focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative">
            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full py-4 pl-12 pr-4 border rounded-full focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setPassword(e.target.value)}
            />
            <a
              href="#"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700 text-sm"
            >
              Forgot Password?
            </a>
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="form-checkbox text-primary" />
            <span className="ml-2 text-gray-600">
              By Signing Up I agree with{" "}
              <a href="#" className="text-blue-500 hover:text-blue-700">
                Terms & Conditions
              </a>
            </span>
          </div>
          <button onClick={(e) => handleRegister(e)} className="w-full bg-green-500 text-white py-3 rounded-full font-semibold hover:bg-green-700">
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
