import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await API.post("/api/auth/login", { email, password });
      const { token, user } = response.data;
      
      if (token && user) {
        login(user, token);
        navigate("/blogs");
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white/70 backdrop-blur-xl border border-gray-100 p-10 rounded-[2.5rem] shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-purple-700 to-blue-600 mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-500 font-medium">Log in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} autoComplete="on" className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 ml-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="name@example.com"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white transition-all placeholder-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:bg-white transition-all placeholder-gray-400"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm py-3 px-4 rounded-xl border border-red-100 animate-pulse">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/40 transform active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-purple-600 font-bold hover:underline">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
