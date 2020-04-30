import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'

import { initializeBlogs } from '../reducers/blogReducer'

const BlogList = ({ user }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
