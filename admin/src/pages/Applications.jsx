import React, { useEffect, useState } from "react";
import axios from "axios";

const Applications = () => {
  const url = "http://localhost:4000/app/application/fetch";
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch applications from the API
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(url);
        console.log(response.data.data);
        setApplications(response.data.data); // Assuming `data.data` contains the application list
      } catch (err) {
        setError("Failed to fetch applications. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Handle Approve button click
  const handleApprove = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "approved" } : app
      )
    );
  };

  // Handle Reject button click
  const handleReject = (id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "rejected" } : app
      )
    );
  };

  if (isLoading) {
    return <p className="text-center py-6">Loading applications...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-6">{error}</p>;
  }

  return (
    <section className="bg-gray-50 py-10 px-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-[#000080] mb-6 text-center">
          Admin Panel - Applications
        </h1>

        <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
          <table className="min-w-full text-base text-left text-gray-700">
            <thead className="bg-[#007BFF] text-white">
              <tr>
                <th className="py-4 px-6">#</th>
                <th className="py-4 px-6">Full Name</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Reason</th>
                <th className="py-4 px-6">Fund Amount (NPR)</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Phone</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((app, index) => (
                  <tr
                    key={app.id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6">{app.fullname}</td>
                    <td className="py-4 px-6">{app.email}</td>
                    <td className="py-4 px-6">{app.reason}</td>
                    <td className="py-4 px-6">{app.fundamount}</td>
                    <td className="py-4 px-6">{app.location}</td>
                    <td className="py-4 px-6">{app.phonenumber}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2 py-1 rounded-lg text-white ${
                          app.status === "approved"
                            ? "bg-green-500"
                            : app.status === "rejected"
                            ? "bg-red-500"
                            : "bg-gray-400"
                        }`}
                      >
                        {app.status === "approved"
                          ? "Approved"
                          : app.status === "rejected"
                          ? "Rejected"
                          : "Pending"}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleApprove(app.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 mr-2 mb-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(app.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 mb-2"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="9"
                    className="py-4 px-6 text-center text-gray-500"
                  >
                    No applications available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Applications;
