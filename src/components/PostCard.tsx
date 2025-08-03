'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'
import { useAuth } from '@/contexts/AuthContext'

interface Post {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    name: string
    email: string
    bio?: string
  }
  _count?: {
    likes: number
  }
  likes?: Array<{ userId: string }>
}

interface PostCardProps {
  post: Post
  onLikeToggle?: () => void
}

export default function PostCard({ post, onLikeToggle }: PostCardProps) {
  const { token, user } = useAuth()
  const likesCount = post._count?.likes || 0
  const likedByMe = post.likes?.some(like => like.userId === user?.id) || false
  
  const [likes, setLikes] = useState(likesCount)
  const [liked, setLiked] = useState(likedByMe)

  const toggleLike = async () => {
    if (!user) {
      console.log('No user logged in')
      return
    }

    if (!token) {
      console.log('No token available')
      return
    }

    console.log('Attempting to toggle like for post:', post.id)
    console.log('Current liked state:', liked)

    try {
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()
      console.log('Like response:', response.status, data)

      if (response.ok) {
        setLiked(data.liked)
        setLikes((prevLikes) => data.liked ? prevLikes + 1 : prevLikes - 1)
        // Call the callback to notify parent component
        if (onLikeToggle) {
          onLikeToggle()
        }
      } else {
        console.error('Like failed:', data.error)
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 mb-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {post.author.name.charAt(0).toUpperCase()}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <Link 
              href={`/profile/${post.author.id}`}
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              {post.author.name}
            </Link>
            <span className="text-gray-500 text-sm">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </span>
          </div>
          
          <p className="mt-2 text-gray-800 whitespace-pre-wrap leading-relaxed">{post.content}</p>
          
          <div className="flex items-center mt-4 pt-2 border-t border-gray-100">
            <button 
              onClick={toggleLike} 
              className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                liked 
                  ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                  : 'bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <span className="text-lg">{liked ? '❤️' : '🤍'}</span>
              <span>{liked ? 'Unlike' : 'Like'}</span>
            </button>
            <span className="text-sm text-gray-500 ml-4">
              {likes} {likes === 1 ? 'like' : 'likes'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
