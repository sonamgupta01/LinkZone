'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

interface CreatePostProps {
  onPostCreated: () => void
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const { token, user } = useAuth()
  const maxChars = 500
  const remainingChars = maxChars - content.length

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    // Check if token exists
    if (!token) {
      setError('No authentication token found. Please login again.')
      return
    }

    setLoading(true)
    setError('')

    try {
      console.log('Sending request with token:', token ? 'Token exists' : 'No token')
      
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content: content.trim() }),
      })

      const data = await response.json()
      console.log('Response:', response.status, data)

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create post')
      }

      setContent('')
      setIsFocused(false)
      onPostCreated()
    } catch (err) {
      console.error('Post creation error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 mb-6">
      <div className="flex items-start space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
          {user?.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">Share your thoughts</h3>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => {
              if (e.target.value.length <= maxChars) {
                setContent(e.target.value)
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What's on your mind?"
            rows={isFocused ? 6 : 4}
            maxLength={maxChars}
            className={`w-full p-4 border-2 rounded-lg focus:outline-none resize-none text-gray-900 bg-white placeholder-gray-500 transition-all duration-200 ${
              isFocused 
                ? 'border-blue-500 shadow-md' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            disabled={loading}
          />
          
          {(isFocused || content) && (
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-gray-500">
                Tip: Share something interesting or ask a question!
              </div>
              <div className={`text-sm ${
                remainingChars < 50 
                  ? remainingChars < 0 ? 'text-red-500' : 'text-orange-500'
                  : 'text-gray-500'
              }`}>
                {remainingChars} characters remaining
              </div>
            </div>
          )}
        </div>
        
        {error && (
          <div className="text-red-600 text-sm mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Your post will be visible to all users
          </div>
          <button
            type="submit"
            disabled={loading || !content.trim() || remainingChars < 0}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Posting...</span>
              </div>
            ) : (
              'Share Post'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
