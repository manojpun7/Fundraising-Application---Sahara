import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "../assets/assets";
import emailjs from "@emailjs/browser";

const Application = () => {
  const form = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const url = "http://localhost:4000/app/application/submission";
  const [applicationData, setApplicationData] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    fundamount: "",
    reason: "",
    location: "",
    image: "",
  });

  const [numbers, setNumbers] = useState([0, 0]);
  const [isAnimated, setIsAnimated] = useState(false);
  const counterRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setApplicationData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setApplicationData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //this code is for sending data through email js i will use in admin side !!!!!!!
    emailjs
      .sendForm("service_jv7dcxo", "template_8hu3x5e", form.current, {
        publicKey: "07R2Ni316qFS5eUzQ",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
    // };

    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(url, applicationData);
      console.log(response);
      toast.success("Application submitted successfully!", {
        position: "top-right",
      });
      setIsLoading(false);
      setApplicationData({
        fullname: "",
        email: "",
        phonenumber: "",
        fundamount: "",
        reason: "",
        location: "",
        image: "",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (error) {
      toast.error("Failed to submit the application. Please try again.", {
        position: "top-right",
      });
      setIsLoading(false);
    }
  };

  return (
    <section id="application" className="bg-gray-50 py-16 px-6">
      <ToastContainer />
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-5 px-5">
        {/* Description Section */}
        <div className="lg:w-5/12 text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-bold text-[#000080] mb-6">
            About Application
          </h2>
          <p className="text-2xl text-gray-700 mb-8">
            If you or someone you know is in need of assistance, please fill out
            the application form below. Our team will review your request and
            get back to you as soon as possible. Your details will remain
            confidential and used solely for the purpose of providing
            assistance.
          </p>
          <div className="flex justify-between items-center gap-8 py-10">
            <div className="flex flex-col justify-center items-center w-full lg:w-5/12"></div>
            <div className="flex flex-col justify-center items-center w-full lg:w-5/12"></div>
          </div>
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl md:text-4xl font-bold text-[#000080] mb-6">
            Apply for Assistance
          </h2>

          <form ref={form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={applicationData.fullname}
              onChange={handleInputChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={applicationData.email}
              onChange={handleInputChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              required
            />
            <textarea
              placeholder="Reason for Assistance"
              name="reason"
              value={applicationData.reason}
              onChange={handleInputChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              required
            ></textarea>
            <input
              type="number"
              placeholder="Fund Amount"
              name="fundamount"
              value={applicationData.fundamount}
              onChange={handleInputChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={applicationData.location}
              onChange={handleInputChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              name="phonenumber"
              value={applicationData.phonenumber}
              onChange={handleInputChange}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              pattern="[0-9]{10}"
              required
            />

            <label className="block mb-1 font-medium">Upload Document</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full mb-5"
              ref={fileInputRef}
              required
            />

            <button
              type="submit"
              className="w-full py-3 bg-[#007BFF] text-white rounded-lg hover:bg-[#0056b3] transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Application;
