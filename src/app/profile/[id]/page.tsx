'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navigation from '@/components/Navigation'
import PostCard from '@/components/PostCard'
import { useAuth } from '@/contexts/AuthContext'
import { formatDistanceToNow } from 'date-fns'

interface UserProfile {
  id: string
  name: string
  email: string
  bio?: string
  createdAt: string
  posts: any[]
}

export default function ProfilePage() {
  const { id } = useParams()
  const { user: currentUser } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchProfile = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/users/${id}`)
      const data = await response.json()
      
      if (response.ok) {
        setProfile(data.user)
      } else {
        setError(data.error || 'Failed to fetch profile')
      }
    } catch (err) {
      setError('Failed to fetch profile')
    } finally {
      setLoading(false)
    }
  }

  const refreshProfile = async () => {
    try {
      const response = await fetch(`/api/users/${id}`)
      const data = await response.json()
      
      if (response.ok) {
        setProfile(data.user)
      }
    } catch (err) {
      console.error('Error refreshing profile:', err)
    }
  }

  useEffect(() => {
    if (id) {
      fetchProfile()
    }
  }, [id])

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-3xl mx-auto p-4">
          <div className="text-center text-gray-600">
            Please log in to view profiles.
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-3xl mx-auto p-4">
          <div className="text-center text-gray-600">Loading...</div>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-3xl mx-auto p-4">
          <div className="text-center text-red-600">
            {error || 'Profile not found'}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-3xl mx-auto p-4">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {profile.name}
              </h1>
              <p className="text-gray-600 mb-2">{profile.email}</p>
              {profile.bio && (
                <p className="text-gray-800 mb-2">{profile.bio}</p>
              )}
              <p className="text-sm text-gray-500">
                Joined {formatDistanceToNow(new Date(profile.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Posts ({profile.posts.length})
          </h2>
          {profile.posts.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-600">
              No posts yet.
            </div>
          ) : (
            profile.posts.map((post) => (
              <PostCard key={post.id} post={post} onLikeToggle={refreshProfile} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
