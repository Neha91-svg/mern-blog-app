import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-100 px-6 py-4 flex justify-between items-center shadow-sm">
      <div
        className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-600 cursor-pointer hover:opacity-80 transition"
        onClick={() => navigate("/")}
      >
        BlogApp
      </div>
      
      <div className="space-x-6 flex items-center">
        <Link to="/" className="text-gray-600 font-semibold hover:text-purple-600 transition">
          Home
        </Link>
        <Link to="/blogs" className="text-gray-600 font-semibold hover:text-purple-600 transition">
          All Blogs
        </Link>
        
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <Link
              to="/create"
              className="bg-purple-600 text-white px-5 py-2.5 rounded-2xl font-bold shadow-lg shadow-purple-500/20 hover:bg-purple-700 hover:shadow-purple-500/30 transition-all transform active:scale-95"
            >
              Create Post
            </Link>
            <div className="flex items-center space-x-3 bg-gray-50 px-3 py-1.5 rounded-2xl border border-gray-100">
              <span className="text-sm font-bold text-gray-700 hidden sm:inline">{user?.username}</span>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 font-semibold hover:text-purple-600 transition">
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-2xl font-bold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all transform active:scale-95"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
