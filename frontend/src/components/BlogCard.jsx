import React from "react";

export default function BlogCard({ blog, currentUserId, onEdit, onDelete }) {
  const isAuthor = currentUserId === blog.author?._id || currentUserId === blog.author; // Handle both populated and unpopulated author

  return (
    <div className="group relative bg-white/60 backdrop-blur-lg border border-gray-100 p-8 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-500">
          ✨
        </div>
      </div>

      <div className="flex flex-col h-full">
        <h3 className="text-2xl font-black text-gray-800 leading-tight mb-4 group-hover:text-purple-700 transition-colors">
          {blog.title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed line-clamp-3 mb-6 flex-grow">
          {blog.content}
        </p>
        
        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs">
              {blog.author?.username?.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-800">{blog.author?.username}</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                {new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>
          </div>

          {isAuthor && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(blog)}
                className="p-2.5 bg-gray-50 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
                title="Edit Post"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(blog._id)}
                className="p-2.5 bg-gray-50 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                title="Delete Post"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
