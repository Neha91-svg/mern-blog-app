import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <div
        className="text-2xl font-bold cursor-pointer hover:scale-105 transition"
        onClick={() => navigate("/")}
      >
        BlogApp
      </div>
      <div className="space-x-4 flex items-center">
        <Link to="/" className="hover:underline hover:text-yellow-300 transition">
          Home
        </Link>
        <Link to="/blogs" className="hover:underline hover:text-yellow-300 transition">
          All Blogs
        </Link>
        {token ? (
          <>
            <Link
              to="/create"
              className="bg-green-500 px-3 py-1 rounded hover:bg-green-600 transition"
            >
              Create Blog
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline hover:text-yellow-300 transition">
              Login
            </Link>
            <Link to="/register" className="hover:underline hover:text-yellow-300 transition">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
