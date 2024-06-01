import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaDribbble } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white py-8 mt-8 border-t">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <div className="w-1/4">
            <h2 className="text-orange-500 text-lg font-bold mb-2">
              E-commerce
            </h2>
            <address className="not-italic mb-4">
              Cricklewood, London
              <br />
              NW2 6gq, UK
            </address>
            <div className="flex space-x-4">
              <FaFacebook className="text-blue-600 cursor-pointer hover:text-blue-800" />
              <FaTwitter className="text-blue-400 cursor-pointer hover:text-blue-600" />
              <FaLinkedin className="text-blue-700 cursor-pointer hover:text-blue-900" />
              <FaDribbble className="text-pink-600 cursor-pointer hover:text-pink-800" />
            </div>
          </div>
          <div className="w-3/4 flex justify-between">
            <div>
              <h3 className="font-semibold mb-2">Shop</h3>
              <ul>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Gift cards
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Site map
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Polka blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Login
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Sign in
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Sell</h3>
              <ul>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Sell on Polka
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Teams
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Forums
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Affiliates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">About</h3>
              <ul>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Polka, Inc.
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Policies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Investors
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Help</h3>
              <ul>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Trust and safety
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800">
                    Privacy settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <p className="text-gray-500 text-sm">© 2022 Commerce, Inc.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-500 text-sm hover:text-gray-700">
              Privacy policy
            </a>
            <a
              href="#"
              className="text-orange-500 text-sm hover:text-orange-700"
            >
              Terms of use
            </a>
            <a href="#" className="text-gray-500 text-sm hover:text-gray-700">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
