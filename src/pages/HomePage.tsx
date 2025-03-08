"use client"

import { useState, useEffect } from "react"
import { api } from "../services/api"
import PostCard from "../components/PostCard"

interface Post {
  id: string
  title: string
  content: string
  createdAt: string
  author: {
    id: string
    username: string
  }
}

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts")
        setPosts(response.data)
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-semibold">Loading posts...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No posts found. Try a different search term.</p>
          </div>
        ) : (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  )
}

export default HomePage

