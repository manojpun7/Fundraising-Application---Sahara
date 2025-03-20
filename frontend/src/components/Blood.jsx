import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "../assets/assets";

const Blood = () => {
  const [bloodCollectionData, setBloodCollectionData] = useState({
    fullname: "",
    bloodgroup: "",
    gender: "",
    age: "",
    location: "",
    phonenumber: "",
    email: "",
  });

  const url = "http://localhost:4000/app/blood/donate";
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBloodCollectionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(url, bloodCollectionData);
      console.log("Server Response:", response.data);

      toast.success("Application submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
      });

      // Reset form fields after submission
      setBloodCollectionData({
        fullname: "",
        bloodgroup: "",
        gender: "",
        age: "",
        location: "",
        phonenumber: "",
        email: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-5 px-5 my-10">
      <ToastContainer />
      {/* Description Section */}
      <div className="container w-[90%] mx-auto px-6 py-10">
        <h1 className="text-5xl font-bold text-red-600 mb-6 text-center">
          Blood Donation Campaigns
        </h1>
        <p className="text-gray-700 text-2xl text-center mb-8">
          Your blood donation can save lives. Join our efforts to help those in
          need of blood transfusions.
        </p>

        <div className="bg-white shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
          
          <div className="flex justify-between py-10">
            <div>
              <img src={assets.blood_img1} alt="img1" className="w-[370px]"/>
            </div>
            <div>
              <img src={assets.blood_img2} alt="img2" className="w-[400px]"/>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-6">
          Blood Collection
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            name="fullname"
            value={bloodCollectionData.fullname}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            required
          />
          <select
            name="bloodgroup"
            value={bloodCollectionData.bloodgroup}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          <select
            name="gender"
            value={bloodCollectionData.gender}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="number"
            placeholder="Age"
            name="age"
            value={bloodCollectionData.age}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            min="1"
            required
          />
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={bloodCollectionData.location}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            name="phonenumber"
            value={bloodCollectionData.phonenumber}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            pattern="[0-9]{10}"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={bloodCollectionData.email}
            onChange={handleInputChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-[#007BFF] text-white rounded-lg hover:bg-[#0056b3] transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Blood;
