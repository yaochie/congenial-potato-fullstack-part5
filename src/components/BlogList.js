import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

import { deleteBlog } from '../reducers/blogReducer'

export const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2, border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const removeBlog = blogObject => {
    if (window.confirm(`Are you sure you want to delete ${blogObject.title} - ${blogObject.author}?`)) {
      dispatch(deleteBlog(blogObject.id))
    }
  }

  const deleteButton = () => {
    if (blog.user !== undefined && user.username === blog.user.username) {
      return <button onClick={() => removeBlog(blog)}>remove</button>
    } else {
      return null
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div className="basic-info">
        <Link to={`/blogs/${blog.id}`}>{blog.title} - {blog.author}</Link>
      </div>
      {deleteButton()}
    </div>
  )
}


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
