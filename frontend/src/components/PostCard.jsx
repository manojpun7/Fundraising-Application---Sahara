import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 

const PostCard = ({ post }) => {
  const [countdown, setCountdown] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);
  const [isTargetReached, setIsTargetReached] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const deadline = new Date(post.deadline).getTime();
      const distance = deadline - now;

      if (distance < 0) {
        setCountdown("Expired");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [post.deadline]);

  useEffect(() => {
    const percent = (post.totalDonatedAmount / post.targetAmount) * 100;
    setProgressPercent(percent.toFixed(2));
    setIsTargetReached(post.totalDonatedAmount >= post.targetAmount);
  }, [post.totalDonatedAmount, post.targetAmount]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 space-y-3 w-full h-full transform transition duration-300 hover:scale-105">
      {post.imageUrl && (
        <img
          className="rounded-md h-48 w-full object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
          src={post.imageUrl}
          alt={post.title}
        />
      )}

      <h3 className="text-xl font-semibold text-blue-700">{post.title}</h3>

      <p className="mt-4 text-3xl md:text-xl text-gray-600 max-w-2xl mx-auto">
        {post.description}
      </p>

      <div className="mt-4 text-3xl md:text-xl text-gray-600 max-w-2xl mx-auto space-y-1">
        <p>
          Target: Rs <strong>{post.targetAmount}</strong>
        </p>

        <div>
          <p className="mb-1">Progress</p>
          <div className="w-full bg-gray-200 rounded-full h-5 relative">
            <div
              className="bg-blue-600 h-5 rounded-full text-white font-bold text-sm flex items-center justify-center transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            >
              <span className="w-full text-center drop-shadow-sm">
                {progressPercent}%
              </span>
            </div>
          </div>
        </div>

        <p>
          Deadline: {new Date(post.deadline).toLocaleDateString()} (
          <span className="text-red-500">{countdown}</span>)
        </p>
      </div>

      {/* 🎯 Target Reached Message */}
      {isTargetReached && (
        <div className="text-green-600 font-bold text-lg mt-4 bg-green-100 p-2 rounded shadow-inner text-center">
          🎯 Target Reached
        </div>
      )}

      {/* ✅ Donate Button / Link */}
      <div className="block text-left">
        <Link to={isTargetReached ? "#" : `/donate/${post._id}`}>
          <button
            className={`mt-4 px-6 py-3 rounded-lg transition duration-300 shadow-md ${
              isTargetReached
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-[#007BFF] text-white hover:bg-[#0056b3] hover:shadow-lg"
            }`}
            disabled={isTargetReached}
          >
            Donate Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
