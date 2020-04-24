import React, { useState } from 'react'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const name = blog.user === undefined ? '' : blog.user.name

  const handleLike = async () => {
    await addLike(blog)
  }

  const handleDelete = async () => {
    await deleteBlog(blog)
  }

  const details = () => (
    <div className="extra-info">
      <div>{blog.url}</div>
      <div>
        likes {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      <div>{name}</div>
    </div>
  )

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const deleteButton = () => {
    if (blog.user !== undefined && user.username === blog.user.username) {
      return <button onClick={handleDelete}>remove</button>
    } else {
      return null
    }
  }

  return (
    <div style={blogStyle}>
      <div className="basic-info">{blog.title} - {blog.author}</div>
      <button onClick={toggleDetails}>
        {showDetails ? 'hide details' : 'show details'}
      </button>
      {showDetails ? details() : null}
      {deleteButton()}
    </div>
  )
}

export default Blog
