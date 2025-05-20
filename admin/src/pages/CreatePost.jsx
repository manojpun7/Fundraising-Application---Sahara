import React, { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetAmount: "",
    deadline: "",
    image: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

const handleChange = async (e) => {
  const { name, value, files } = e.target;
  if (name === "image" && files.length > 0) {
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result, // base64 string
      }));
    };
    reader.readAsDataURL(file); // Read file as base64
  } else {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  try {
    const res = await axios.post("http://localhost:4000/app/posts/create", formData);

    if (res.data.success) {
      setSuccess("Post created successfully!");
      setFormData({
        title: "",
        description: "",
        targetAmount: "",
        deadline: "",
        image: "", // base64
      });
    } else {
      setError("Failed to create post.");
    }
  } catch (err) {
    console.error(err);
    setError("Something went wrong. Try again.");
  }
};


  return (
    <section className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Create Campaign / Fundraising Post
      </h2>

      {success && <p className="mb-4 text-green-600 text-center">{success}</p>}
      {error && <p className="mb-4 text-red-600 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Target Amount (NPR)</label>
          <input
            type="number"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Submit Post
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
