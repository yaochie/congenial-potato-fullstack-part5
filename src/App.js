import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserView from './components/UserView'

import { setNotification } from './reducers/notificationReducer'
import { createBlog } from './reducers/blogReducer'
import { login, logout } from './reducers/loginReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const blogFormRef = React.createRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
    }
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(logout())
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

  const blogs = () => (
    <div>
      {blogForm()}
      <br />
      <BlogList
        user={user}
      />
    </div>
  )

  if (user === null) {
    return <LoginForm />
  }

  return (
    <Router>
      <div>
        <h2>blogs</h2>
        <Notification />
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <Switch>
        <Route path='/users'>
          <UserView />
        </Route>
        <Route path='/'>
          {blogs()}
        </Route>
      </Switch>
    </Router>
  )
}

export default App
