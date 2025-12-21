import { useEffect, useState } from "react";
import { fetchBlogs, deleteBlog } from "../utils/api";
import BlogCard from "../components/BlogCard";

export default function BlogList({ showSearch = false }) {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const token = localStorage.getItem("token");
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const tokenUserId = localStorage.getItem("userId"); // login ke time store karo
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
    <div>
      {showSearch && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400"
          />
        </div>
      )}

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
