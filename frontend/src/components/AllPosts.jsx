import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import { Link } from "react-router-dom";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://fundraising-application-sahara.onrender.com/app/posts/fetch");
      if (res.data && res.data.fetchedPosts) {
        setPosts(res.data.fetchedPosts);
      } else {
        setError("Invalid response format");
      }
    } catch (err) {
      console.error("Axios error:", err);
      setError("Failed to fetch posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (posts.length > 0) {
      // console.log(
      //   "First post's totalDonatedAmount:",
      //   posts[0].totalDonatedAmount
      // );
    }
  }, [posts]);
  
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="bg-gray-50 min-h-screen">
      <h2 className="text-[#000080] text-3xl md:text-5xl font-bold mb-6 mt-10 text-center">
        Current Needy
      </h2>

      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center">Loading posts...</div>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link
                  to={`/post-fund/${post._id}`}
                  key={post._id}
                  className="w-full sm:w-[48%] lg:w-[30%] hover:shadow-lg transition-shadow"
                >
                  <PostCard post={post} />
                </Link>
              ))
            ) : (
              <div className="text-center text-gray-500">
                No posts available
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllPosts;
