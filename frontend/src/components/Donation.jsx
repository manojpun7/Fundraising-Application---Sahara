import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Donation = () => {
  return (
    <section className="bg-[#f9f9f9] py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <h1 className="text-5xl font-bold text-center text-[#000080]">
          Make a Donation
        </h1>
        <p className="mt-4 text-xl text-center text-gray-700 max-w-2xl mx-auto">
          Choose the type of donation you want to contribute to. Every act of kindness counts.
        </p>

        {/* Donation Options */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Donation Item */}
          {[
            {
              title: "Fund Donation",
              description: "Help provide financial assistance to those in need.",
              img: assets.fund,
              link: "/donation/fund",
              buttonText: "Donate Fund",
            },
            {
              title: "Blood Donation",
              description: "Your blood can save lives. Be a hero for someone in need.",
              img: assets.blood,
              link: "/donation/blood",
              buttonText: "Donate Blood",
            },
            {
              title: "Food & Cloth Donation",
              description: "Provide essential supplies to those affected by disasters.",
              img: assets.foodandcloth,
              link: "/donation/foodandcloth",
              buttonText: "Donate Food & Cloth",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-1/2"
              />
              {/* Content */}
              <div className="p-6 flex flex-col items-center">
                <h3 className="text-3xl font-semibold text-[#007BFF] text-center">
                  {item.title}
                </h3>
                <p className="mt-2 text-gray-700 text-center text-xl">
                  {item.description}
                </p>
                <Link to={item.link}>
                  <button className="mt-4 px-6 py-3 bg-[#007BFF] hover:bg-[#0056b3] text-white rounded-lg hover:shadow-lg transition duration-300">
                    {item.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Donation;
