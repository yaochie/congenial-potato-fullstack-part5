import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
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

export default Blog
