import { Link, useLocation } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";

const PaymentFailure = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const errorMessage =
    queryParams.get("message") || "Payment processing failed";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <FaTimesCircle className="text-red-500 text-6xl animate-pulse" />
        </div>

        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Payment Failed!
        </h1>

        <p className="text-gray-700 text-lg mb-6">
          {errorMessage}. Please try again.
        </p>

        {queryParams.get("code") && (
          <p className="text-sm text-gray-500 mb-4">
            Error Code: {queryParams.get("code")}
          </p>
        )}

        <Link
          to="/"
          className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 mb-4"
        >
          Try Again
        </Link>

        {/* Home Link */}
        <p className="text-gray-600">
          Or return to{" "}
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            homepage
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PaymentFailure;
