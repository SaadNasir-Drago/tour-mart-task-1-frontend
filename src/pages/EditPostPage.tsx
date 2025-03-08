"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import toast from "react-hot-toast"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { api } from "../services/api"

interface EditPostFormData {
  title: string
}

const schema = yup
  .object({
    title: yup.string().required("Title is required").min(3, "Title must be at least 3 characters"),
  })
  .required()

const EditPostPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditPostFormData>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`)
        setValue("title", response.data.title)
        setContent(response.data.content)
      } catch (error) {
        console.error("Error fetching post:", error)
        toast.error("Failed to load post")
        navigate("/")
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id, navigate, setValue])

  const onSubmit = async (data: EditPostFormData) => {
    if (content.trim() === "") {
      toast.error("Content is required")
      return
    }

    try {
      setIsSubmitting(true)
      await api.put(`/posts/${id}`, {
        title: data.title,
        content,
      })

      toast.success("Post updated successfully!")
      navigate(`/posts/${id}`)
    } catch (error) {
      console.error("Error updating post:", error)
      toast.error("Failed to update post")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-semibold">Loading post...</div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title")}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
            Content
          </label>
          <ReactQuill value={content} onChange={setContent} className="h-64 mb-12" />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate(`/posts/${id}`)}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update Post"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditPostPage

