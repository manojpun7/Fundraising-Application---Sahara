import React, { useState, useEffect } from "react";
import axios from "axios";

const BloodDonation = () => {
  const url = "http://localhost:4000/app/blood/fetch"; // API endpoint
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get(url);

        // Initialize data with a default status
        const donationsWithDefaultStatus = response.data.data.map(
          (donation) => ({
            ...donation,
            status: "Pending", // Default status
          })
        );

        setDonations(donationsWithDefaultStatus);
      } catch (err) {
        setError("Failed to fetch blood donations. Please try again later.");
        console.error(err);
      }
    };

    fetchDonations();
  }, []);

  // Update the status column when a button is clicked
  const handleStatusChange = (id, newStatus) => {
    setDonations((prevDonations) =>
      prevDonations.map((donation) =>
        donation.id === id ? { ...donation, status: newStatus } : donation
      )
    );
  };

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-[#000080] mb-6 text-center">
          Blood Donation Management
        </h1>
      </header>

      {/* Donation Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto text-lg">
          <thead className="bg-[#007BFF] text-white">
            <tr>
              <th className="px-6 py-3 text-left">Donor Name</th>
              <th className="px-6 py-3 text-left">Blood Group</th>
              <th className="px-6 py-3 text-left">Gender</th>
              <th className="px-6 py-3 text-left">Age</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Phone</th>
            </tr>
          </thead>
          <tbody>
            {donations.length > 0 ? (
              donations.map((donation) => (
                <tr key={donation.id} className="border-b">
                  <td className="px-6 py-3">{donation.fullname}</td>
                  <td className="px-6 py-3">{donation.bloodgroup}</td>
                  <td className="px-6 py-3">{donation.gender}</td>
                  <td className="px-6 py-3">{donation.age}</td>
                  <td className="px-6 py-3">{donation.email}</td>
                  <td className="px-6 py-3">{donation.phonenumber}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-3 text-center text-gray-500">
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

export default BloodDonation;
