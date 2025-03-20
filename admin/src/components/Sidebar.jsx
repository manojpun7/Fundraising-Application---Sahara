import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          to={"/application"}
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
              isActive ? "bg-[#afb6bb] text-white" : "text-gray-800"
            }`
          }
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="" />
          <p className="hidden md:block text-xl">Applications</p>
        </NavLink>
        <NavLink
          to={"/blooddonation"}
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
              isActive ? "bg-[#afb6bb] text-white" : "text-gray-800"
            }`
          }
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block text-xl">Blood Donation</p>
        </NavLink>
        <NavLink
          to={"/foodandcloth"}
          className={({ isActive }) =>
            `flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l ${
              isActive ? "bg-[#afb6bb] text-white" : "text-gray-800"
            }`
          }
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block text-xl">Food & Cloth</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
