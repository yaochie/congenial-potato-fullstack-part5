import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [showDetails, setShowDetails] = useState(false)

  const name = blog.user === undefined ? '' : blog.user.name

  const details = () => (
    <div>
      <div>{blog.url}</div>
      <div>likes {blog.likes} <button>like</button></div>
      <div>{name}</div>
    </div>
  )

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author}
      <button onClick={toggleDetails}>
        {showDetails ? 'hide details' : 'show details'}
      </button>
      {showDetails ? details() : null}
    </div>
  )
}

export default Blog
