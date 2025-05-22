import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { assets } from "../assets/assets";

const Fund = () => {
  const [formData, setformData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    amount: "10",
    tax_amount: "0",
    total_amount: "10",
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: "http://localhost:5173/paymentsuccess",
    failure_url: "http://localhost:5173/paymentfailure",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
  });

  // generate signature function
  const generateSignature = (
    total_amount,
    transaction_uuid,
    product_code,
    secret
  ) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    const hashedSignature = CryptoJS.enc.Base64.stringify(hash);
    return hashedSignature;
  };

  // useeffect
  useEffect(() => {
    const { total_amount, transaction_uuid, product_code } = formData;

    const signature = generateSignature(
      total_amount,
      transaction_uuid,
      product_code,
      formData.secret
    );

    const baseSuccessURL = "http://localhost:5173/paymentsuccess";
    const userPayload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      total_amount: formData.total_amount,
    };
    const encodedUser = btoa(JSON.stringify(userPayload));

    const finalSuccessURL = `${baseSuccessURL}?user=${encodeURIComponent(
      encodedUser
    )}`;

    setformData((prev) => ({
      ...prev,
      signature,
      success_url: finalSuccessURL,
    }));
  }, [
    formData.total_amount,
    formData.fullName,
    formData.email,
    formData.phone,
    formData.message,
  ]);

  return (
    <>
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

          <form
            action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
            method="POST"
          >
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) =>
                setformData({ ...formData, fullName: e.target.value })
              }
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setformData({ ...formData, email: e.target.value })
              }
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              required
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setformData({ ...formData, phone: e.target.value })
              }
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              // pattern="[0-9]{10}"
              required
            />

            <textarea
              placeholder="Message (optional)"
              value={formData.message}
              onChange={(e) =>
                setformData({ ...formData, message: e.target.value })
              }
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              rows="4"
            />

            <input
              type="text"
              id="amount"
              name="amount"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
              autoComplete="off"
              placeholder="Amount"
              value={formData.amount}
              onChange={({ target }) =>
                setformData({
                  ...formData,
                  amount: target.value,
                  total_amount: target.value,
                })
              }
              required
            />

            <input
              type="hidden"
              id="tax_amount"
              name="tax_amount"
              value={formData.tax_amount}
              required
            />
            <input
              type="hidden"
              id="total_amount"
              name="total_amount"
              value={formData.total_amount}
              required
            />
            <input
              type="hidden"
              id="transaction_uuid"
              name="transaction_uuid"
              value={formData.transaction_uuid}
              required
            />

            <input
              type="hidden"
              id="product_code"
              name="product_code"
              value={formData.product_code}
              required
            />
            <input
              type="hidden"
              id="product_service_charge"
              name="product_service_charge"
              value={formData.product_service_charge}
              required
            />
            <input
              type="hidden"
              id="product_delivery_charge"
              name="product_delivery_charge"
              value={formData.product_delivery_charge}
              required
            />
            <input
              type="hidden"
              id="success_url"
              name="success_url"
              value={formData.success_url}
              required
            />
            <input
              type="hidden"
              id="failure_url"
              name="failure_url"
              value={formData.failure_url}
              required
            />
            <input
              type="hidden"
              id="signed_field_names"
              name="signed_field_names"
              value={formData.signed_field_names}
              required
            />
            <input
              type="hidden"
              id="signature"
              name="signature"
              value={formData.signature}
              required
            />

            <button
              type="submit"
              className="w-full py-3 bg-[#007BFF] text-white rounded-lg hover:bg-[#0056b3] transition duration-300"
            >
              pay via Esewa
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Fund;
