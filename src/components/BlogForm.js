import React, { useState } from 'react'

const BlogForm = ({ addBlog, setNotification }) => {
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
    const newBlog = await addBlog(blogObject)

    setTitle('')
    setAuthor('')
    setUrl('')

    setNotification({
      text: `Added new blog: ${newBlog.title} by ${newBlog.author}`,
      type: 'success'
    })
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <form onSubmit={handleCreation}>
      <div>
        title:
        <input
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL:
        <input
          type='text'
          value={url}
          name='URL'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default BlogForm
