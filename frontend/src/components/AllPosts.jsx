import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/app/posts/fetch");
      console.log(res);
      setPosts(res.data.fetchedPosts);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch posts.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(posts);
  return (
    <section className=" ">
      <h2 className="text-[#000080] text-5xl font-bold mb-6 text-center ">
        Current Needy
      </h2>
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="w-full px-4 sm:px-6 lg:px-8 ">
        <div className="flex flex-wrap gap-6 justify-center ">
          {posts.map((post) => (
            <div key={post._id} className="w-full sm:w-[48%] lg:w-[30%]">
              <PostCard post={post} />
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllPosts;
