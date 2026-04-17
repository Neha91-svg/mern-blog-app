# 📝 MERN Blog Application

A full-stack **Blog Application** built using the **MERN Stack** (MongoDB, Express, React, Node.js).  
The application is **Dockerized** and deployed using **Render (Backend)** and **Vercel (Frontend)**.

---

## 🚀 Optimization Journey

Recently, the application underwent a significant performance and architecture overhaul to ensure scalable, high-speed, and premium user experiences.

### 🌓 Before vs 🌈 After Optimization

| Feature | 🌓 Before Optimization | 🌈 After Optimization |
| :--- | :--- | :--- |
| **Initial Load** | High TTI due to large monolithic bundle. | **Lazy Loading** (React.lazy/Suspense) reduced initial size. |
| **Auth State** | Scattered `localStorage` calls in components. | Centralized **AuthContext** & `useAuth` hook. |
| **API Handling** | Boilerplate-heavy `fetch` calls in every file. | Centralized **Axios Instance** with Interceptors. |
| **Data Fetching** | Expensive filtering on every re-render. | **`useMemo`** optimized filtering logic. |
| **UI Design** | Basic Tailwind CSS layout. | Premium **Glassmorphism**, Custom Fonts, and Hero Sections. |
| **Code Structure** | Duplicated logic in Blogs & Home pages. | Reusable, modular **`BlogList`** component. |

---

## 🔥 Key Technical Improvements

### 1. **Performance & Routing**
- **Lazy Loading**: Route-based code splitting ensures faster first-paint times.
- **Filtering**: Memorized search logic prevents unnecessary computations.

### 2. **Modern Architecture**
- **Centralized API**: Axios interceptors automatically handle JWT tokens and 401 Unauthorized errors.
- **Global Context**: React Context API manages user state globally, ensuring data consistency across the app.

### 3. **Premium UI/UX**
- **Glassmorphism**: Backdrop blur effects for a sleek, modern aesthetic.
- **Outfit Typography**: Custom Google Font integration for a professional look.
- **Hero Section**: New high-impact home page design to engage visitors.

---

## 🛠 Tech Stack

### Frontend
- **React 19** (Vite)
- **Context API** (State Management)
- **Axios** (Centralized API Client)
- **Tailwind CSS 4** (Styling)

### Backend
- **Node.js & Express**
- **MongoDB & Mongoose**
- **JWT Authentication**

---

## 📦 DevOps / Deployment
- **Docker**: Containerized for consistency across environments.
- **Render**: Backend Hosting.
- **Vercel**: Frontend Hosting.
