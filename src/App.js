import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, deleteBlog, likeBlog } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()

    dispatch(createBlog(blogObject, user))

    dispatch(setNotification({
      text: `Added new blog: ${blogObject.title} by ${blogObject.author}`,
      type: 'success'
    }, 3))
  }

  const blogForm = () => (
    <Togglable
      showLabel="new blog"
      ref={blogFormRef}
      hideLabel="cancel"
    >
      <BlogForm addBlog={addBlog} />
    </Togglable>
  )

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <LoginForm setUser={setUser} />
    </div>
  )

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

  const handleDeleteBlog = async blogObject => {
    if (window.confirm(`Are you sure you want to delete ${blogObject.title} - ${blogObject.author}?`)) {
      dispatch(deleteBlog(blogObject.id))
    }
  }

  if (user === null) {
    return loginForm()
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </div>
      <br />
      {blogForm()}
      <br />
      <BlogList
        addLike={addLike}
        deleteBlog={handleDeleteBlog}
        user={user}
      />
    </div>
  )
}

export default App
