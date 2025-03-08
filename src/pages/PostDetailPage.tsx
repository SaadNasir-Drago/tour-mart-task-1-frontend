"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import toast from "react-hot-toast"
import { api } from "../services/api"
import { AuthContext } from "../contexts/AuthContext"

interface Post {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
  author: {
    id: string
    username: string
  }
  authorId: string
}

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`)
        setPost(response.data)
      } catch (error) {
        console.error("Error fetching post:", error)
        toast.error("Failed to load post")
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return
    }

    try {
      setDeleting(true)
      await api.delete(`/posts/${id}`)
      toast.success("Post deleted successfully")
      navigate("/")
    } catch (error) {
      console.error("Error deleting post:", error)
      toast.error("Failed to delete post")
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-semibold">Loading post...</div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          Return to home page
        </Link>
      </div>
    )
  }

  const isAuthor = user && user.id === post.authorId

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-500">
          <span>By {post.author.username}</span>
          <span className="mx-2">•</span>
          <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
        </div>

        {isAuthor && (
          <div className="flex space-x-2">
            <Link
              to={`/edit-post/${post.id}`}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>

      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

      <div className="mt-8">
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          ← Back to all posts
        </Link>
      </div>
    </div>
  )
}

export default PostDetailPage

