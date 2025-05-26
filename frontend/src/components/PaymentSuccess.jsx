import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { assets } from "../assets/assets";

const PaymentSuccess = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const query = location.search.split("?")[1];
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

  useEffect(() => {
    const useFetch = async () => {
      try {
        if (!userData) return;

        if (
          userData.fullName &&
          userData.total_amount &&
          userData.postId &&
          !userData.email &&
          !userData.phone &&
          !userData.message
        ) {
          const response = await axios.post(
            `http://localhost:4000/app/posts/add-donor-to-post/${userData.postId}`,
            userData
          );
          console.log("Donor to post submitted:", response.data);
        } else if (
          userData.fullName &&
          userData.email &&
          userData.phone &&
          userData.message &&
          userData.total_amount
        ) {
          const response = await axios.post(
            "http://localhost:4000/app/fund/create",
            userData
          );
          console.log("Fund submission successful:", response.data);
        } else {
          console.warn("Unrecognized userData format. Skipping API call.");
        }
      } catch (error) {
        console.error("Submission failed:", error);
      }
    };

    useFetch();
  }, [userData]);

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
        {userData ? (
          <>
            <p className="mt-2 text-xl text-gray-700">
              Name: {userData.fullName}
            </p>
            {userData.email && (
              <p className="text-xl text-gray-700">Email: {userData.email}</p>
            )}
            {userData.postId && (
              <p className="text-xl text-gray-700">PostId: {userData.postId}</p>
            )}
            {userData.phone && (
              <p  className="mt-2 text-xl text-gray-700">
                Phone: {userData.phone}
              </p>
            )}
            {userData.message && (
              <p className="text-xl text-gray-700">
                Message: {userData.message}
              </p>
            )}
            <p className="text-xl text-gray-700 font-semibold mt-4">
              Amount Paid: Rs{userData.amount || userData.total_amount}
            </p>
          </>
        ) : (
          <p>Loading payment info...</p>
        )}
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
