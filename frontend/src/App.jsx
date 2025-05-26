import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Donation from "./components/Donation";
import Application from "./components/Application";
import Help from "./components/Help";
import OurGoals from "./components/OurGoals";
import Fund from "./components/Fund";
import Blood from "./components/Blood";
import Foodandcloth from "./components/Foodandcloth";
import Home from "./pages/Home";
import PaymentSuccess from "./components/PaymentSuccess";
import PostFund from "./pages/PostFund";
import PaymentFailure from "./components/PaymentFailure";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        <Route path="/paymentfailure" element={<PaymentFailure />} />
      </Routes>

      <Navbar />

      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/donation/fund/" element={<Fund />} />
          <Route path="/donation/blood" element={<Blood />} />
          <Route path="/donation/foodandcloth" element={<Foodandcloth />} />
          <Route path="/application" element={<Application />} />
          <Route path="/help" element={<Help />} />
          <Route path="/goals" element={<OurGoals />} />
          <Route path="/post-fund/:id" element={<PostFund />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
