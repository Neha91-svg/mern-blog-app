import { useState, useEffect } from "react";
import { createBlog, fetchBlogs } from "../utils/api";
import { useNavigate, useLocation } from "react-router-dom";

export default function CreateBlog() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const params = new URLSearchParams(location.search);
  const editId = params.get("edit");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editId) {
      const fetchBlog = async () => {
        const data = await fetchBlogs();
        const blogToEdit = data.find((b) => b._id === editId);
        if (blogToEdit) {
          setTitle(blogToEdit.title);
          setDescription(blogToEdit.content);
        }
      };
      fetchBlog();
    }
  }, [editId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    await createBlog({ title, description }, token, editId); // pass editId
    navigate("/blogs");
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">{editId ? "Edit Blog" : "Create Blog"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <textarea
          placeholder="Content"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg shadow hover:from-blue-600 hover:to-purple-600 transition">
          {editId ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
}
