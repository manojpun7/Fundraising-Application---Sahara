import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { assets } from "../assets/assets";

const PaymentSuccess = () => {
  const location = useLocation();
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  useEffect(() => {
    const query = location.search.split("?")[1]; // get everything after the first ?
    const cleanSearch = new URLSearchParams(query);

    const encodedUser = cleanSearch.get("user");

    if (encodedUser) {
      try {
        const decoded = atob(encodedUser);
        const parsed = JSON.parse(decoded);
        console.log("Decoded user:", parsed);
        setUserData(parsed);
      } catch (error) {
        console.error("Error decoding user data:", error);
      }
    }
  }, [location.search]);

  const useFetch = async () => {
    const response = await axios.post(
      "http://localhost:4000/app/fund/create",
      userData
    );
    console.log("submitted:" + response);
  };
  useEffect(() => {
    useFetch();
  }, []);
  console.log(userData);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[300px] text-center">
        <img
          className="w-1/2 mx-auto mb-4"
          src={assets.check}
          alt="tick sign"
        />
        <p className="mt-5 text-green-600 text-2xl font-bold">
          Payment Successful!
        </p>
        <p className="mt-2 text-xl text-gray-700">Name: {userData.fullName}</p>
        <p className="text-xl text-gray-700">Email: {userData.email}</p>
        <p className="mt-2 text-xl text-gray-700">Phone: {userData.phone}</p>
        <p className="text-xl text-gray-700">Message: {userData.message}</p>
        <p className="text-xl text-gray-700"></p>
        <p className="text-xl text-gray-700 font-semibold mt-4">
          Amount Paid: Rs{userData.total_amount}
        </p>
        <Link to="/">
          <button className="mt-10 w-full py-3 bg-[#007BFF] text-white rounded-lg hover:bg-[#0056b3] transition duration-300">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
