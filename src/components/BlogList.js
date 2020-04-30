import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = ({ user }) => {
  const blogs = useSelector(state => state.blogs)

  const sortByLikes = (a, b) => a.likes < b.likes

  const blogEntry = blog => (
    <Blog
      key={blog.id}
      blog={blog}
      user={user}
    />
  )

  return (
    <div>
      {blogs.sort(sortByLikes).map(blog => blogEntry(blog))}
    </div>
  )
}

export default BlogList
