"use client"

import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import { api } from "../services/api"
import { AuthContext } from "../contexts/AuthContext"

interface Post {
  id: string
  title: string
  content: string
  createdAt: string
}

const ProfilePage = () => {
  const { user } = useContext(AuthContext)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user) return

      try {
        const response = await api.get(`/posts/user/${user.id}`)
        setPosts(response.data)
      } catch (error) {
        console.error("Error fetching user posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserPosts()
  }, [user])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-semibold">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Username:</p>
              <p className="font-medium">{user?.username}</p>
            </div>
            <div>
              <p className="text-gray-600">Email:</p>
              <p className="font-medium">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">My Posts</h2>
          <Link to="/create-post" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Create New Post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">You haven't created any posts yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="border-b pb-4 last:border-b-0">
                <h3 className="text-lg font-semibold mb-2">
                  <Link to={`/posts/${post.id}`} className="text-blue-600 hover:text-blue-800">
                    {post.title}
                  </Link>
                </h3>
                <div className="text-sm text-gray-500 mb-2">
                  <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
                </div>
                <div className="flex space-x-2 mt-2">
                  <Link to={`/edit-post/${post.id}`} className="text-blue-500 hover:text-blue-700 text-sm">
                    Edit
                  </Link>
                  <Link to={`/posts/${post.id}`} className="text-green-500 hover:text-green-700 text-sm">
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage

