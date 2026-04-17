import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";

export default function CreateBlog() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const params = new URLSearchParams(location.search);
  const editId = params.get("edit");

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (editId) {
      const fetchBlog = async () => {
        try {
          const response = await API.get("/api/posts");
          const blogToEdit = response.data.find((b) => b._id === editId);
          if (blogToEdit) {
            setFormData({
              title: blogToEdit.title,
              content: blogToEdit.content,
            });
          }
        } catch (err) {
          console.error("Failed to fetch blog for editing:", err);
          setError("Failed to load blog data.");
        }
      };
      fetchBlog();
    }
  }, [editId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;
    setIsLoading(true);
    setError("");

    try {
      if (editId) {
        await API.put(`/api/posts/${editId}`, {
          title: formData.title,
          content: formData.content,
        });
      } else {
        await API.post("/api/posts", {
          title: formData.title,
          content: formData.content, // backend expects 'content'
        });
      }
      navigate("/blogs");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="bg-white/80 backdrop-blur-xl border border-gray-100 p-8 rounded-[2rem] shadow-xl">
        <h1 className="text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-600">
          {editId ? "Edit Your Post" : "Create New Post"}
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 ml-1">Title</label>
            <input
              type="text"
              placeholder="Give your post a catchy title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white transition-all placeholder-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 ml-1">Content</label>
            <textarea
              placeholder="What's on your mind? Share your story..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows="8"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white transition-all placeholder-gray-400 resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm py-3 px-4 rounded-xl border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transform active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : editId ? "Update Post" : "Publish Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
