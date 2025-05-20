import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Applications from "./pages/Applications";
import BloodDonation from "./pages/BloodDonation";
import FoodAndCloth from "./pages/foodandcloth";
import CreatePost from "./pages/CreatePost";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {/* Directly render the admin panel without the login check */}
      <Navbar />
      <hr />
      <div className="flex w-full">
        <Sidebar />
        <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
          <Routes>
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/application" element={<Applications />} />
            <Route path="/blooddonation" element={<BloodDonation />} />
            <Route path="/foodandcloth" element={<FoodAndCloth />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
