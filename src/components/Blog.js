import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const name = blog.user === undefined ? '' : blog.user.name

  const addLike = blogObject => {
    const updatedBlog = {
      user: blogObject.user.id,
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url,
      likes: blogObject.likes + 1
    }

    dispatch(likeBlog(updatedBlog, blogObject.id))
  }

  const removeBlog = blogObject => {
    if (window.confirm(`Are you sure you want to delete ${blogObject.title} - ${blogObject.author}?`)) {
      dispatch(deleteBlog(blogObject.id))
    }
  }

  const details = () => (
    <div className="extra-info">
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button onClick={() => addLike(blog)} className="like-button">
          like
        </button>
      </div>
      <div>{name}</div>
    </div>
  )

  const toggleDetails = () => {
    setShowDetails(!showDetails)
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
      <div className="basic-info">{blog.title} - {blog.author}</div>
      <button onClick={toggleDetails} className="toggle">
        {showDetails ? 'hide details' : 'show details'}
      </button>
      {showDetails ? details() : null}
      {deleteButton()}
    </div>
  )
}

export default Blog
