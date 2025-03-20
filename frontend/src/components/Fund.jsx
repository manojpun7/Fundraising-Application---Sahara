import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { assets } from "../assets/assets";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Fund = () => {
  const [formData, setFormData] = useState({
    amount: "10",
    tax_amount: "0",
    total_amount: "10",
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: "http://localhost:5173",
    failure_url: "http://localhost:5173",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q", // Keep secret on the server-side in production
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Generate signature function
  const generateSignature = (
    total_amount,
    transaction_uuid,
    product_code,
    secret
  ) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    return CryptoJS.enc.Base64.stringify(hash);
  };

  useEffect(() => {
    const { total_amount, transaction_uuid, product_code, secret } = formData;
    const hashedSignature = generateSignature(
      total_amount,
      transaction_uuid,
      product_code,
      secret
    );
    setFormData((prev) => ({ ...prev, signature: hashedSignature }));
  }, [formData.amount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success("Redirecting to eSewa payment...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });

      // Create and submit the eSewa payment form dynamically
      const esewaForm = document.createElement("form");
      esewaForm.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
      esewaForm.method = "POST";
      esewaForm.style.display = "none";

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "secret") {
          // Exclude secret from being sent to the frontend
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = value;
          esewaForm.appendChild(input);
        }
      });

      document.body.appendChild(esewaForm);
      esewaForm.submit();
    }, 2000);
  };

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-5 px-5 my-10">
        <div className="container w-2/3 mx-auto px-6 py-10">
          <h1 className="text-5xl font-bold text-[#000080] mb-6 text-center">
            Fund Donations
          </h1>
          <p className="text-gray-700 text-2xl text-center mb-8">
            Your financial support empowers us to assist those in need during
            challenging times. Together, we can rebuild lives and communities.
          </p>
          <div className="bg-white shadow-md rounded-lg p-6 mb-8 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between py-10 gap-3">
              <div>
                <img src={assets.fund_img1} alt="img1" className="w-[420px]" />
              </div>
              <div>
                <img src={assets.fund_img2} alt="img2" className="w-[400px]" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl md:text-4xl font-bold text-[#000080] mb-6">
            Fund Collection
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              pattern="[0-9]{10}"
              required
            />
            <textarea
              placeholder="Message (optional)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              rows="4"
            ></textarea>
            <input
              type="number"
              placeholder="Donation Amount (NPR)"
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: e.target.value,
                  total_amount: e.target.value,
                })
              }
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              min="1"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#007BFF] text-white rounded-lg hover:bg-[#0056b3] transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Fund;
