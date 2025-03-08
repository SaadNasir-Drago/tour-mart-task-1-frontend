import { Link } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"

interface PostCardProps {
  post: {
    id: string
    title: string
    content: string
    createdAt: string
    author: {
      username: string
    }
  }
}

const PostCard = ({ post }: PostCardProps) => {
  // Create a preview of the content (first 150 characters)
  const contentPreview = post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-2xl font-bold mb-2">
        <Link to={`/posts/${post.id}`} className="text-blue-600 hover:text-blue-800">
          {post.title}
        </Link>
      </h2>

      <div className="text-sm text-gray-500 mb-4">
        <span>By {post.author.username}</span>
        <span className="mx-2">•</span>
        <span>{formatDistanceToNow(new Date(post.createdAt))} ago</span>
      </div>

      <div className="prose prose-sm mb-4" dangerouslySetInnerHTML={{ __html: contentPreview }} />

      <Link to={`/posts/${post.id}`} className="text-blue-500 hover:text-blue-700 font-medium">
        Read more →
      </Link>
    </div>
  )
}

export default PostCard

