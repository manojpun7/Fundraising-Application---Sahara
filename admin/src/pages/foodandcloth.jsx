import React, { useState, useEffect } from "react";
import axios from "axios";

const FoodAndCloth = () => {
  const url = "http://localhost:4000/app/fc-collection/fetch";
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState(null);

  // Fetch donations from API
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(url);
        setDonations(response.data.data); // Set the fetched data
      } catch (err) {
        setError("Failed to fetch donations. Please try again later.");
        console.error(err);
      }
    };

    fetchDonations();
  }, []);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold text-[#000080] mb-6 text-center">
        Admin Panel - Food and Cloth Donations
      </h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto text-lg">
          <thead>
            <tr className="bg-[#007BFF] text-white">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {donations.length > 0 ? (
              donations.map((donation, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{donation.fullname}</td>
                  <td className="px-4 py-2">{donation.email}</td>
                  <td className="px-4 py-2">{donation.phonenumber}</td>
                  <td className="px-4 py-2">{donation.location}</td>
                  <td className="px-4 py-2">{donation.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                  No donations available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodAndCloth;
