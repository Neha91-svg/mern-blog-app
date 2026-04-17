import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";
import BlogCard from "../components/BlogCard";

export default function BlogList({ showSearch = false, limit = null }) {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await API.get("/api/posts");
        setBlogs(response.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };
    getBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    let filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.content.toLowerCase().includes(search.toLowerCase()) ||
        blog.author.username.toLowerCase().includes(search.toLowerCase())
    );
    if (limit) {
      filtered = filtered.slice(0, limit);
    }
    return filtered;
  }, [search, blogs, limit]);

  const handleDelete = async (id) => {
    if (!token) return;
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;

    try {
      await API.delete(`/api/posts/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Failed to delete blog:", err);
    }
  };

  const handleEdit = (blog) => {
    navigate(`/create?edit=${blog._id}`);
  };

  return (
    <div className="w-full">
      {showSearch && (
        <div className="relative mb-12">
          <input
            type="text"
            placeholder="Search amazing stories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-8 py-5 bg-white/50 backdrop-blur-xl border border-gray-100 rounded-[2rem] shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-lg placeholder-gray-400"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl">
            🔍
          </div>
        </div>
      )}

      {filteredBlogs.length === 0 ? (
        <div className="text-center py-20 bg-white/40 backdrop-blur-md rounded-[3rem] border border-gray-100">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-gray-500 text-xl font-bold">No blogs found</p>
          <p className="text-gray-400 mt-2">Check back later or try a different search.</p>
        </div>
      ) : (
        <div className="grid gap-10 md:grid-cols-2">
          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              currentUserId={user?.id}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
