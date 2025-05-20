import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const HeroPage = () => {
  const [numbers, setNumbers] = useState([0, 0, 0, 0, 0, 0]);
  const [isAnimated, setIsAnimated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            setIsAnimated(true);
            animateNumbers(0, [1500, 1900, 1500, 50, 3000, 2000], 2000);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [isAnimated]);

  const animateNumbers = (start, endValues, duration) => {
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 0.7);

      setNumbers(
        endValues.map((endValue) =>
          Math.floor(progress * (endValue - start) + start)
        )
      );

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

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

          {/* Login/Signup Button */}
          {/* <button
            onClick={() => setShowLogin(true)}
            className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition"
          >
            Login / Sign Up
          </button> */}
        </div>

        <img
          src={assets.hero_img}
          alt="Hero Background"
          className="w-auto h-[60%] object-cover opacity-100 pointer-events-none overflow-hidden rounded-xl m-20"
        />
      </section>

      {/*  Top-right avatar with logout dropdown */}
      {/* <div className="absolute top-4 right-6 z-50">
        <div className="relative">
          <img
            src="https://www.svgrepo.com/show/382106/avatar-boy-face-man-user.svg"
            alt="User Avatar"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500"
            onClick={() => setShowDropdown((prev) => !prev)}
          />
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-28 bg-white shadow-md rounded-md border p-2">
              <button
                onClick={() => {
                  // Placeholder logout logic
                  setShowDropdown(false);
                  alert("Logged out!");
                }}
                className="text-red-600 font-medium hover:underline"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div> */}

      {/* 🔹 Login Modal */}
      {/* {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md relative">
            <h2 className="text-2xl font-bold text-[#000080] mb-6 text-center">
              Login
            </h2>
            <form>
              <input
                type="email"
                placeholder="Email"
                className="w-full mb-4 p-3 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full mb-4 p-3 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="w-full bg-[#007BFF] text-white py-3 rounded hover:bg-[#0056b3]"
              >
                Login
              </button>
            </form>
            <p className="text-center mt-4 text-sm text-gray-700">
              Don’t have an account?{" "}
              <button
                onClick={() => {
                  setShowLogin(false);
                  setShowSignUp(true);
                }}
                className="text-[#007BFF] font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )} */}

      {/* 🔹 Signup Modal
      {showSignUp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] max-w-md relative">
            <h2 className="text-2xl font-bold text-[#000080] mb-6 text-center">
              Sign Up
            </h2>
            <form>
              <input
                type="text"
                placeholder="Username"
                className="w-full mb-4 p-3 border border-gray-300 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full mb-4 p-3 border border-gray-300 rounded"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full mb-4 p-3 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full mb-4 p-3 border border-gray-300 rounded"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full mb-4 p-3 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
              >
                Register
              </button>
            </form>
            <p className="text-center mt-4 text-sm text-gray-700">
              Already have an account?{" "}
              <button
                onClick={() => {
                  setShowSignUp(false);
                  setShowLogin(true);
                }}
                className="text-[#007BFF] font-semibold hover:underline"
              >
                Login
              </button>
            </p>
            <button
              onClick={() => setShowSignUp(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )} */}

      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="text-[#000080] text-5xl font-bold">
            By The People, For The People
          </div>
          <div className="mt-8 flex flex-col sm:flex-row sm:space-x-8 space-y-8 sm:space-y-0">
            {/* Donation Image 1 */}
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

            {/* Donation Image 2 */}
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
      </section>

      {/* Section with Cards */}
      <section className="bg-gray-50">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 px-32"
          ref={cardRef}
        >
          {[
            { img: assets.form, text: "Beneficiaries Impacted" },
            { img: assets.money_bag, text: "Aid Generated" },
            { img: assets.patient, text: "Blood Distributed" },
            { img: assets.social_media, text: "Engaged Volunteer" },
            { img: assets.success, text: "Active Doner" },
            { img: assets.delivery, text: "Food Distributed" },
          ].map((card, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center border bg-white p-4"
            >
              <img
                src={card.img}
                alt={card.text}
                className="w-20 h-auto rounded-lg p-2"
              />
              <p className="text-5xl p-2 text-[#007BFF]">
                {index === 0
                  ? `${numbers[index]}+`
                  : `${numbers[index].toLocaleString()}+`}
              </p>
              <p className="text-2xl p-2">{card.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeroPage;
