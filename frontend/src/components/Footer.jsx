export default function Footer() {
  return (
    <footer className="bg-white shadow-inner py-6 mt-12">
      <div className="container mx-auto text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} BlogApp. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-blue-600">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600">Terms of Service</a>
          <a href="#" className="hover:text-blue-600">Contact</a>
        </div>
      </div>
    </footer>
  )
}
