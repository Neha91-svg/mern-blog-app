import BlogList from "./BlogList";

export default function Blogs() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-600">
          Explorer
        </h1>
        <p className="text-gray-500 font-medium text-lg italic">
          Dive into a world of thoughts, experiences, and expertise.
        </p>
      </div>

      <BlogList showSearch={true} />
    </div>
  );
}
