import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreation = async (event) => {
    event.preventDefault()

    const blogObject = {
      author,
      title,
      url
    }

    // add blog to blog list
    await addBlog(blogObject)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleCreation} className="formDiv">
      <div>
        title:
        <input
          type='text'
          value={title}
          name='Title'
          id='title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          name='Author'
          id='author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL:
        <input
          type='text'
          value={url}
          name='URL'
          id='url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm
