import { useEffect, useState } from "react";
import { fetchBlogs, deleteBlog } from "../utils/api";
import BlogCard from "../components/BlogCard";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const token = localStorage.getItem("token");
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const tokenUserId = localStorage.getItem("userId"); // set on login
    if (tokenUserId) setCurrentUserId(tokenUserId);

    const getBlogs = async () => {
      const data = await fetchBlogs();
      setBlogs(data);
      setFilteredBlogs(data);
    };
    getBlogs();
  }, []);

  useEffect(() => {
    const filtered = blogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.content.toLowerCase().includes(search.toLowerCase()) ||
        blog.author.username.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBlogs(filtered);
  }, [search, blogs]);

  const handleDelete = async (id) => {
    if (!token) return;
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;

    const success = await deleteBlog(id, token);
    if (success) setBlogs(blogs.filter((b) => b._id !== id));
  };

  const handleEdit = (blog) => {
    window.location.href = `/create?edit=${blog._id}`;
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Blogs</h2>

      <input
        type="text"
        placeholder="Search by title, content, or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-6 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
      />

      {filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              currentUserId={currentUserId}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
