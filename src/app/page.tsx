"use client"

import { useEffect, useState, useMemo } from "react"
import CreatePost from "@/components/CreatePost"
import PostCard from "@/components/PostCard"
import Navigation from "@/components/Navigation"
import SearchBar from "@/components/SearchBar"
import { useAuth } from "@/contexts/AuthContext"
import AuthForm from "@/components/AuthForm"

export default function Home() {
  const { user, loading } = useAuth()
  const [posts, setPosts] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const fetchPosts = async () => {
    const response = await fetch("/api/posts")
    const data = await response.json()
    if (response.ok) {
      setPosts(data.posts)
    }
  }

  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts
    return posts.filter(post => 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [posts, searchQuery])

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="font-sans min-h-screen">
      {user && <Navigation />}
      <div className={user ? "max-w-3xl mx-auto p-4" : ""}>
        {loading ? (
          <div className="flex justify-center items-center min-h-screen">
            <div className="text-xl text-gray-600">Loading...</div>
          </div>
        ) : user ? (
          <>
            <CreatePost onPostCreated={() => fetchPosts()} />
            <SearchBar onSearch={setSearchQuery} />
            {filteredPosts.length === 0 && searchQuery ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <div className="text-gray-500">
                  No posts found for "{searchQuery}"
                </div>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-blue-600 hover:underline mt-2"
                >
                  Clear search
                </button>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                No posts yet. Be the first to share something!
              </div>
            ) : (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} onLikeToggle={fetchPosts} />
              ))
            )}
          </>
        ) : (
          <AuthForm />
        )}
      </div>
    </div>
  )
}
