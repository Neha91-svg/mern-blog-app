const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/api";

// Fetch all blogs
export const fetchBlogs = async () => {
  try {
    const res = await fetch(`${BASE_URL}/posts`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch blogs");
    return data;
  } catch (err) {
    console.error("fetchBlogs error:", err.message);
    return [];
  }
};

// Create a new blog (requires JWT token)
export const createBlog = async (blogData, token) => {
  if (!token) {
    console.error("No token provided for createBlog");
    return null;
  }

  try {
    const res = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: blogData.title,
        content: blogData.description,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to create blog");
    return data;
  } catch (err) {
    console.error("createBlog error:", err.message);
    return null;
  }
};

// Delete a blog
export const deleteBlog = async (id, token) => {
  try {
    const res = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to delete blog");
    return true;
  } catch (err) {
    console.error("deleteBlog error:", err.message);
    return false;
  }
};

// Register user
export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to register");
    return data;
  } catch (err) {
    console.error("registerUser error:", err.message);
    return { error: err.message };
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to login");
    return data;
  } catch (err) {
    console.error("loginUser error:", err.message);
    return { error: err.message };
  }
};
