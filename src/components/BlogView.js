import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { deleteBlog, likeBlog, addComment } from '../reducers/blogReducer'

const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const submitComment = (event) => {
    event.preventDefault()
    console.log('comment', comment)

    dispatch(addComment({ comment: comment }, blogId))
    setComment('')
  }

  return (
    <Form onSubmit={submitComment}>
      <Row>
        <Col>
          <Form.Control
            type='text'
            name='comment'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </Col>
        <Col>
          <Button type='submit'>add comment</Button>
        </Col>
      </Row>
    </Form>
  )
}

const BlogView = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  const user = useSelector(state => state.user)

  if (!blog) {
    return (
      <>
        <div>Blog not found.</div>
        <div><Link to='/'>Return to main page</Link></div>
      </>
    )
  }

  const addLike = blogObject => {
    const updatedBlog = {
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url,
      likes: blogObject.likes + 1
    }

    if (blogObject.user) {
      updatedBlog.user = blogObject.user.id
    }

    dispatch(likeBlog(updatedBlog, blogObject.id))
  }

  const removeBlog = blogObject => {
    if (window.confirm(`Are you sure you want to delete ${blogObject.title} - ${blogObject.author}?`)) {
      dispatch(deleteBlog(blogObject.id))
      history.push('/')
    }
  }

  const deleteButton = () => {
    if (blog.user !== undefined && user.username === blog.user.username) {
      return <Button onClick={() => removeBlog(blog)}>remove</Button>
    } else {
      return null
    }
  }

  const name = blog.user === undefined ? 'unknown' : blog.user.name

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
          likes {blog.likes}&nbsp;
          <Button onClick={() => addLike(blog)} className="like-button">
            like
          </Button>
        </div>
        <div>added by {name}</div>
      </div>
      <div>
        Comments:
        <CommentForm blogId={blog.id} />
        <ul>
          {blog.comments.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </div>
      {deleteButton()}
      <div>
        <Link to='/'>back to main page</Link>
      </div>
    </div>
  )
}

export default BlogView
