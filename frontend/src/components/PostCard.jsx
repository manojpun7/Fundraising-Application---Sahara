import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
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

      <div className="mt-4 text-3xl md:text-xl text-gray-600 max-w-2xl mx-auto">
        <p>Target: NPR {post.targetAmount}</p>
        <p>Deadline: {new Date(post.deadline).toLocaleDateString()}</p>
      </div>

      <Link to={"/donation/fund"} className="block text-left">
        <button className="mt-4 px-6 py-3 bg-[#007BFF] text-white rounded-lg hover:bg-[#0056b3] transition duration-300 shadow-md hover:shadow-lg">
          Donate Now
        </button>
      </Link>
    </div>
  );
};

export default PostCard;
