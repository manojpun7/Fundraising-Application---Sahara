import React from "react";

const OurGoals = () => {
  return (
    <section className="bg-gray-100 py-16 px-4 pb-28" id="goals">
      <div className="container mx-auto">
        {/* Heading Section */}
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-[#000080]">
            Our Mission & Goals
          </h2>
          <p className="mt-4 text-3xl md:text-xl text-gray-600 max-w-2xl mx-auto">
            Our mission is to empower communities by providing resources and support for critical needs. Together, we can bring hope and lasting change to those in need.
          </p>
        </div>

        {/* Goals Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Goal 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center bg-[#007BFF] text-white rounded-full w-16 h-16 mb-6 mx-auto">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h11M9 21V3m11 18V3"
                ></path>
              </svg>
            </div>
            <h3 className="text-3xl font-semibold text-gray-800 text-center">
              Rebuilding Lives
            </h3>
            <p className="mt-4 text-gray-600 text-center text-xl">
              Providing long-term support to rebuild homes and rehabilitate families affected by disasters.
            </p>
          </div>

          {/* Goal 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center bg-[#007BFF] text-white rounded-full w-16 h-16 mb-6 mx-auto">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 21V9m0 0L8 21m12-12L4 9"
                ></path>
              </svg>
            </div>
            <h3 className="text-3xl font-semibold text-gray-800 text-center">
              Sustainable Food & Water Access
            </h3>
            <p className="mt-4 text-gray-600 text-center text-xl">
              Ensuring consistent food supplies and clean drinking water for vulnerable communities.
            </p>
          </div>

          {/* Goal 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center bg-[#007BFF] text-white rounded-full w-16 h-16 mb-6 mx-auto">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m6 4h.01M16 13V9h-4m-3 4v-2H6"
                ></path>
              </svg>
            </div>
            <h3 className="text-3xl font-semibold text-gray-800 text-center">
              Access to Medical Care
            </h3>
            <p className="mt-4 text-gray-600 text-center text-xl">
              Providing emergency healthcare, medical supplies, and vaccination programs for at-risk populations.
            </p>
          </div>

          {/* Goal 4 */}
          <div className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center bg-[#007BFF] text-white rounded-full w-16 h-16 mb-6 mx-auto">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
            </div>
            <h3 className="text-3xl font-semibold text-gray-800 text-center">
              Education & Awareness
            </h3>
            <p className="mt-4 text-gray-600 text-center text-xl">
              Empowering communities through education initiatives and disaster preparedness training.
            </p>
          </div>

          {/* Goal 5 */}
          <div className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center bg-[#007BFF] text-white rounded-full w-16 h-16 mb-6 mx-auto">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 8h10M7 12h10M7 16h10M5 21h14M3 7h18"
                ></path>
              </svg>
            </div>
            <h3 className="text-3xl font-semibold text-gray-800 text-center">
              Disaster Relief Funds
            </h3>
            <p className="mt-4 text-gray-600 text-center text-xl">
              Establishing rapid-response funds to tackle unforeseen emergencies and natural disasters.
            </p>
          </div>

          {/* Goal 6 */}
          <div className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center justify-center bg-[#007BFF] text-white rounded-full w-16 h-16 mb-6 mx-auto">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 12l2 2m-2-2l-2 2m2-2l-2 2m2-2l2 2"
                ></path>
              </svg>
            </div>
            <h3 className="text-3xl font-semibold text-gray-800 text-center">
              Empowering Local Communities
            </h3>
            <p className="mt-4 text-gray-600 text-center text-xl">
              Supporting local initiatives and entrepreneurs to create sustainable, community-driven development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurGoals;
