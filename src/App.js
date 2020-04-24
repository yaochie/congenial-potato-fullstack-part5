import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

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

  const addBlog = async (blogObject) => {
    // toggle must come before setBlogs
    blogFormRef.current.toggleVisibility()

    const response = await blogService.create(blogObject)
    setBlogs(blogs.concat(response))

    return response
  }

  const blogForm = () => (
    <Togglable
      showLabel="new blog"
      ref={blogFormRef}
      hideLabel="cancel"
    >
      <BlogForm
        addBlog={addBlog}
        setNotification={setNotification}
      />
    </Togglable>
  )

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification message={notification} />
      <LoginForm
        setUser={setUser}
        setNotification={setNotification}
      />
    </div>
  )

  const addLike = async blogObject => {
    const updatedBlog = {
      user: blogObject.user.id,
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url,
      likes: blogObject.likes + 1
    }

    const response = await blogService.update(updatedBlog, blogObject.id)

    const newObject = {
      ...blogObject,
      likes: response.likes
    }

    setBlogs(blogs.map(blog => blog.id === blogObject.id ? newObject : blog))
  }

  if (user === null) {
    return loginForm()
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </div>
      <br />
      {blogForm()}
      <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} />
      )}
    </div>
  )
}

export default App
