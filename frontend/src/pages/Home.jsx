import BlogList from "./BlogList";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
        Welcome to BlogApp
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Browse the latest blogs below
      </p>
      <BlogList />
    </div>
  );
}
