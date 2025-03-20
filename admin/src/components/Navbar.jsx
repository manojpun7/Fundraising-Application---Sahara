import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <div className="flex justify-between items-center gap-4">
        <div className="text-[#000080] font-bold text-5xl">Sahara</div>
        <img src={assets.biology} alt="logo" className="w-10" />
      </div>
    </div>
  );
};

export default Navbar;
