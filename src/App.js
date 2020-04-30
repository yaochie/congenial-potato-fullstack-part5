import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch, Route, Link
} from 'react-router-dom'

import { Form, Navbar, Nav, Button } from 'react-bootstrap'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserView from './components/UserView'
import SingleUserView from './components/SingleUserView'
import BlogView from './components/BlogView'

import { setNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
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

  useEffect(() => {
    dispatch(initializeBlogs())
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

  const padding = {
    padding: 5
  }

  if (user === null) {
    return <LoginForm />
  }

  return (
    <div className='container'>
      <Navbar bg='dark' variant='dark' sticky='top'>
        <Nav>
          <Nav.Link href='#'>
            <Link style={padding} to='/'>blogs</Link>
          </Nav.Link>
          <Nav.Link href='#'>
            <Link style={padding} to='/users'>users</Link>
          </Nav.Link>
        </Nav>

        <Navbar.Text>
          {user.name} logged in&nbsp;
          <Button onClick={handleLogout}>Logout</Button>
        </Navbar.Text>
      </Navbar>
      <div>
        <h2>blogs</h2>
        <Notification />
      </div>
      <Switch>
        <Route path='/users/:id'>
          <SingleUserView />
        </Route>
        <Route path='/users'>
          <UserView />
        </Route>
        <Route path='/blogs/:id'>
          <BlogView />
        </Route>
        <Route path='/'>
          {blogs()}
        </Route>
      </Switch>
    </div>
  )
}

export default App
