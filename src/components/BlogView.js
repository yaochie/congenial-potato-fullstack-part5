import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'

import { likeBlog, addComment } from '../reducers/blogReducer'

const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')

  const handleSubmitComment = (event) => {
    event.preventDefault()

    dispatch(addComment({ comment: comment }, blogId))
  }

  return (
    <form onSubmit={handleSubmitComment}>
      <input
        type='text'
        name='comment'
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button>add comment</button>
    </form>
  )
}

const BlogView = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))

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

  const name = blog.user === undefined ? 'unknown' : blog.user.name

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>
          likes {blog.likes}
          <button onClick={() => addLike(blog)} className="like-button">
            like
          </button>
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
      <div>
        <Link to='/'>back to main page</Link>
      </div>
    </div>
  )
}

export default BlogView
