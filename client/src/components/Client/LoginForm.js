import React from "react";
import { FaGoogle, FaApple, FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// IMPORT API SERVICES
import { useAuthService } from "../../services/index";

const LoginForm = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  // Behavior variables
  const navigate = useNavigate();

  const { login } = useAuthService();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(username, password);
    console.log(response);
    if (response !== null && response._statusCode === 200) {
      localStorage.setItem("UserInfo", JSON.stringify(response._data));
      navigate("/");
    } else {
      alert("Login failed");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-4">
          Login to your account
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Enter to continue and explore within your grasp
        </p>
        <form className="space-y-6">
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              className="w-full py-4 pl-12 pr-4 border rounded-full focus:outline-none focus:ring focus:border-blue-300"
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
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zM4 10c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6zm6 4c1.66 0 3-1.34 3-3S11.66 8 10 8 7 9.34 7 11s1.34 3 3 3zm0-2c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox text-primary" />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-blue-500 hover:text-blue-700 text-sm">
              Forgot password?
            </a>
          </div>
          <button onClick={(e) => handleLogin(e)} className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-primary-dark">
            Log in to continue
          </button>
        </form>
        <div className="my-8 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-400">Or sign in with</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center py-3 border rounded-full text-gray-700 hover:bg-gray-100">
            <FaGoogle className="mr-2 text-red-600" />
            <span className="text-lg font-medium">Continue with Google</span>
          </button>
          <button className="w-full flex items-center justify-center py-3 border rounded-full text-gray-700 hover:bg-gray-100">
            <FaApple className="mr-2 text-black" />
            <span className="text-lg font-medium">Continue with Apple</span>
          </button>
        </div>
        <p className="text-center text-gray-600 mt-8">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
