import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Form, Button } from 'react-bootstrap'

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
    <Form onSubmit={handleCreation} className="formDiv">
      <Form.Group>
        <Form.Label>title:</Form.Label>
        <Form.Control
          type='text'
          value={title}
          name='Title'
          id='title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>author:</Form.Label>
        <Form.Control
          type='text'
          value={author}
          name='Author'
          id='author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>URL:</Form.Label>
        <Form.Control
          type='text'
          value={url}
          name='URL'
          id='url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </Form.Group>
      <Button type='submit'>create</Button>
    </Form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm
