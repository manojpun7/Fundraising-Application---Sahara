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

function App() {
  return (
    <div>
      {/* Navbar */}

      <Navbar />
      {/* Routes for the pages */}
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/donation/fund" element={<Fund />} />
          <Route path="/donation/blood" element={<Blood />} />
          <Route path="/donation/foodandcloth" element={<Foodandcloth />} />
          <Route path="/application" element={<Application />} />
          <Route path="/help" element={<Help />} />
          <Route path="/goals" element={<OurGoals />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
