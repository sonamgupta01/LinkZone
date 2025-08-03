'use client'

import { formatDistanceToNow } from 'date-fns'

interface CommentProps {
  comment: {
    id: string
    content: string
    createdAt: string
    user: {
      id: string
      name: string
      email: string
    }
  }
}

export default function Comment({ comment }: CommentProps) {
  return (
    <div className="flex items-start space-x-3 py-3">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {comment.user.name.charAt(0).toUpperCase()}
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="bg-gray-50 rounded-lg px-3 py-2">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-semibold text-gray-900 text-sm">
              {comment.user.name}
            </span>
            <span className="text-gray-500 text-xs">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
          </div>
          <p className="text-gray-800 text-sm whitespace-pre-wrap">
            {comment.content}
          </p>
        </div>
      </div>
    </div>
  )
}
