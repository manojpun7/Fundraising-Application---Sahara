import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Applications = () => {
  const url = "http://localhost:4000/app/application/fetch";
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(url);
        setApplications(response.data.data);
      } catch (err) {
        setError("Failed to fetch applications. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/app/application/update-status/${id}`,
        { status }
      );
      if (response.data.success) {
        setApplications((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status } : app))
        );
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;

    try {
      const response = await axios.delete(
        `http://localhost:4000/app/application/delete/${id}`
      );
      if (response.data.success) {
        setApplications((prev) => prev.filter((app) => app._id !== id));
      } else {
        alert("Failed to delete application.");
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Error deleting application. Please try again.");
    }
  };

  if (isLoading) {
    return <p className="text-center py-6">Loading applications...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 py-6">{error}</p>;
  }

  return (
    <section className="bg-gray-50 py-10 px-4 sm:px-6">
      <div className="w-full overflow-x-auto rounded-lg shadow-md bg-white">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#000080] mb-6 text-center">
          Admin Panel - Applications
        </h1>

        <table className="w-full text-sm sm:text-base text-left text-gray-700">
          <thead className="bg-[#007BFF] text-white">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Full Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Reason</th>
              <th className="py-3 px-4">Fund (NPR)</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
              <th className="py-3 px-4">Image</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app, index) => (
                <tr
                  key={app._id}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{app.fullname}</td>
                  <td className="py-3 px-4">{app.email}</td>
                  <td className="py-3 px-4">{app.reason}</td>
                  <td className="py-3 px-4">{app.fundamount}</td>
                  <td className="py-3 px-4">{app.location}</td>
                  <td className="py-3 px-4">{app.phonenumber}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-lg text-white ${
                        app.status === "approved"
                          ? "bg-green-500"
                          : app.status === "rejected"
                          ? "bg-red-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {app.status === "approved" ? (
                      <button
                        onClick={() => updateStatus(app._id, "rejected")}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 mr-2 mb-2"
                      >
                        Reject
                      </button>
                    ) : (
                      <button
                        onClick={() => updateStatus(app._id, "approved")}
                        className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 mr-2 mb-2"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(app._id)}
                      className="px-3 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <a
                      href={app.imageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      View Document
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="py-4 px-6 text-center text-gray-500"
                >
                  No applications available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Applications;
