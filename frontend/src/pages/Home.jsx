import BlogList from "./BlogList";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="max-w-6xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full"></div>
        
        <h1 className="text-6xl sm:text-7xl font-black mb-8 leading-tight tracking-tight">
          Share Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-600">Vision</span> <br />
          Inspire the <span className="underline decoration-purple-500/30">World</span>.
        </h1>
        
        <p className="max-w-2xl mx-auto text-xl text-gray-500 font-medium mb-10 leading-relaxed">
          The modern stage for thinkers, creators, and storytellers. Explore the latest insights or start your own journey today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/blogs" 
            className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-2xl hover:bg-gray-800 transition-all transform hover:-translate-y-1"
          >
            Explore Blogs
          </Link>
          {!isAuthenticated && (
            <Link 
              to="/register" 
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border border-gray-100 rounded-2xl font-bold shadow-lg hover:bg-gray-50 transition-all transform hover:-translate-y-1"
            >
              Start Writing
            </Link>
          )}
        </div>
      </div>

      {/* Featured Blogs Section */}
      <div className="mt-32">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-black text-gray-800">Latest Stories</h2>
          <Link to="/blogs" className="text-purple-600 font-bold hover:underline flex items-center gap-2">
            View all <span className="text-xl">→</span>
          </Link>
        </div>
        
        <BlogList limit={4} />
      </div>
    </div>
  );
}
