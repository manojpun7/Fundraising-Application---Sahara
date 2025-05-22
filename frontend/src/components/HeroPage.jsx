import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import axios from "axios";
import AllPosts from "./AllPosts";
import NumberCards from "./NumberCards";

const HeroPage = () => {
  const [topDonors, setTopDonors] = useState([]);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const res = await axios.get("http://localhost:4000/app/fund/fetch");
        const data = res.data?.data || [];

        // Group and sum donations by fullName
        const donorMap = {};
        data.forEach((donor) => {
          if (donorMap[donor.fullName]) {
            donorMap[donor.fullName] += parseFloat(donor.total_amount);
          } else {
            donorMap[donor.fullName] = parseFloat(donor.total_amount);
          }
        });

        // Convert to array and sort by amount
        const sorted = Object.entries(donorMap)
          .map(([name, total]) => ({ name, total }))
          .sort((a, b) => b.total - a.total);

        setTopDonors(sorted);
      } catch (error) {
        console.error("Failed to fetch donors:", error);
      }
    };

    fetchDonors();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="flex items-center justify-center text-center relative">
        <div className="container w-1/2 mx-auto px-6 lg:px-12 py-16 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-[#000080] leading-tight">
            Welcome to Sahara, Fundraising Platform
          </h1>
          <blockquote className="mt-8 italic text-lg md:text-2xl text-[#000080]">
            "The smallest act of kindness is worth more than the grandest
            intention." – Oscar Wilde
          </blockquote>
          <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
            <Link to={"/donation"}>
              <button className="px-6 py-3 bg-[#007BFF] text-white rounded-lg text-lg font-semibold hover:bg-[#0056b3] transition">
                Start Your Contribution
              </button>
            </Link>
            <Link to={"/help"}>
              <button className="px-6 py-3 bg-[#003366] text-white border border-[#003366] rounded-lg text-lg font-semibold hover:bg-[#001f33] transition">
                Learn More
              </button>
            </Link>
          </div>
        </div>
        <div className="flex-col w-1/3 bg-white rounded-lg p-4 shadow-md">
          <h1 className="text-3xl font-bold text-[#000080] mb-4 text-center border-b pb-2">
            Top Donors
          </h1>

          <div className="max-h-[300px] overflow-y-auto pr-2">
            {topDonors.length === 0 ? (
              <p className="text-gray-500 text-center">No donors yet</p>
            ) : (
              <ul className="space-y-3">
                {topDonors.map((donor, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b pb-2 text-lg"
                  >
                    <div className="flex gap-3 items-center">
                      <span className="text-gray-500 font-medium">
                        {index + 1}.
                      </span>
                      <span className="font-semibold text-[#003366]">
                        {donor.name}
                      </span>
                    </div>
                    <span className="text-[#007BFF] font-bold">
                      Rs. {donor.total}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      <AllPosts />

      <NumberCards />

      {/* <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="text-[#000080] text-5xl font-bold">
            By The People, For The People
          </div>
          <div className="mt-8 flex flex-col sm:flex-row sm:space-x-8 space-y-8 sm:space-y-0">
           
            <div className="flex-1">
              <img
                src={assets.donation}
                alt="Education Support"
                className="w-full h-auto rounded-lg pt-5 pl-20 pr-20 pb-5"
              />
              <div className="flex flex-col justify-start items-start px-20">
                <h3 className="text-3xl font-semibold text-[#000080] text-start">
                  Empowering Lives Through Generosity
                </h3>
                <p className="mt-2 text-gray-600 text-start text-xl">
                  Your donation provides vital support for education,
                  healthcare, disaster relief, and community development.
                </p>
                <Link to={"/donation"} className="items-start">
                  <button className="mt-4 px-6 py-3 bg-[#007BFF] text-white rounded-lg hover:bg-[#0056b3] transition duration-300 shadow-md hover:shadow-lg items-start">
                    Donate Now
                  </button>
                </Link>
              </div>
            </div>

         
            <div className="flex-1">
              <img
                src={assets.application}
                alt="Disaster Relief Fund"
                className="w-full h-auto rounded-lg p-20 pb-5"
              />
              <div className="flex flex-col justify-start items-start px-20">
                <h3 className="text-3xl font-semibold text-[#000080] text-start">
                  In Times of Crisis, We Stand Together
                </h3>
                <p className="mt-2 text-gray-600 text-start text-xl">
                  Our relief fund is here to help you access critical aid during
                  times of hardship, ensuring that no one faces recovery alone.
                </p>
                <Link to={"/application"} className="items-start">
                  <button className="mt-4 px-6 py-3 bg-[#007BFF] text-white rounded-lg hover:bg-[#0056b3] transition duration-300 shadow-md hover:shadow-lg items-start">
                    Apply Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default HeroPage;

{
  /* <img
          src={assets.hero_img}
          alt="Hero Background"
          className="w-auto h-[60%] object-cover opacity-100 pointer-events-none overflow-hidden rounded-xl m-20"
        /> */
}
