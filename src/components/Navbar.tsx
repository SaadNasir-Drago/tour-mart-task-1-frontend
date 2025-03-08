"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext)

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-xl font-bold text-gray-800">
            Blog Platform
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/create-post" className="text-gray-600 hover:text-gray-900">
                  Create Post
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-gray-900">
                  Profile
                </Link>
                <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
                  Logout
                </button>
                <span className="text-sm text-gray-600">Welcome, {user?.username}</span>
              </>
            ) : (
              <>
                <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                  Login
                </Link>
                <Link to="/register" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

