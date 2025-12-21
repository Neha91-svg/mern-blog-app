import React from "react";

export default function BlogCard({ blog, currentUserId, onEdit, onDelete }) {
  const isAuthor = currentUserId === blog.author._id;

  return (
    <div className="p-4 rounded-lg shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 bg-gradient-to-tr from-purple-50 to-blue-50">
      <h3 className="text-xl font-bold text-purple-700">{blog.title}</h3>
      <p className="text-gray-700 mt-2">{blog.content}</p>
      <p className="text-gray-500 mt-2 text-sm italic">
        Author: <span className="font-semibold">{blog.author.username}</span> |{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      {isAuthor && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onEdit(blog)}
            className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(blog._id)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
