import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets"; // Assuming you have an assets file for images/icons

const Footer = () => {
  return (
    <footer className="bg-[#faf7f7] text-black py-12 mt-0">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Information */}
          <div>
            <div className="flex justify-start items-center gap-2 pb-3">
              <div className="text-[#000080] font-bold text-3xl">
                <Link to="/">Sahara</Link>
              </div>
              <img src={assets.biology} alt="logo" className="w-7" />
            </div>
            <p className="text-gray-500 mb-4 text-xl">
              We are committed to providing assistance to those in need. Our
              platform connects donors and recipients to create a better future
              for everyone in our community.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#007BFF] hover:text-[#007BFF] transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 2.27C18 1.01 16.99 0 15.73 0H8.27C7.01 0 6 1.01 6 2.27v19.46C6 22.99 7.01 24 8.27 24h7.46c1.26 0 2.27-1.01 2.27-2.27V2.27zM12 15v-3.75h2.25l.34-2.62H12V7.77c0-.75.21-1.27 1.28-1.27h1.5v-2.5h-2.5c-2.29 0-2.83 1.31-2.83 2.71v2.87H7v2.62h2.83V15h2.17z"
                  ></path>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#007BFF] hover:text-[#007BFF] transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M23 3a10.08 10.08 0 01-2.89.79A5.1 5.1 0 0022.4 1.35a10.3 10.3 0 01-3.16 1.2A5.1 5.1 0 0016.62 1a5.12 5.12 0 00-5.12 5.12c0 .4.04.79.12 1.16A14.57 14.57 0 011.64 3.16a5.12 5.12 0 001.58 6.85A5.05 5.05 0 01.96 9.5c0 .04 0 .08 0 .12A5.09 5.09 0 005.1 14.6a5.1 5.1 0 01-2.3.09c.65 2.04 2.55 3.51 4.78 3.55A10.3 10.3 0 010 19.29a14.59 14.59 0 007.87 2.3c9.45 0 14.64-7.83 14.64-14.64 0-.22 0-.45-.02-.68A10.49 10.49 0 0023 3z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-3xl font-bold mb-4 text-[#007BFF]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/donation"
                  className="hover:text-gray-700 transition-colors duration-300 text-xl"
                >
                  Donation
                </Link>
              </li>
              <li>
                <Link
                  to="/application"
                  className="hover:text-gray-700 transition-colors duration-300 text-xl"
                >
                  Application
                </Link>
              </li>
              <li>
                <Link
                  to="/help"
                  className="hover:text-gray-700 transition-colors duration-300 text-xl"
                >
                  Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-3xl font-bold mb-4 text-[#007BFF]">
              Contact Us
            </h3>
            <p className="text-gray-500 mb-4 text-xl">
              Feel free to reach out to us for any assistance or questions.
            </p>
            <p className="mb-2 text-xl">
              Email:{" "}
              <a
                href="mailto:info@sahara.com"
                className="text-gray-500 hover:text-gray-700"
              >
                info@sahara.com
              </a>
            </p>
            <p className="mb-2 text-xl">
              Phone: <span className="text-gray-500">+977 9810121270</span>
            </p>
            <p className="mb-2 text-xl">
              Address: <span className="text-gray-500">Kathmandu, Nepal</span>
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-4 text-center">
          <p className="text-lg text-gray-500">
            © 2025 Sahara, All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
