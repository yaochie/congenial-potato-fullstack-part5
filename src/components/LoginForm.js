import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import loginService from '../services/login'
import blogService from '../services/blogs'

import Notification from './Notification'

import { setNotification } from '../reducers/notificationReducer'

const LoginForm = ({ setUser }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      dispatch(setNotification(null))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
    } catch(exception) {
      dispatch(setNotification({
        text: 'invalid credentials',
        type: 'error'
      }), 3000)
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin} id='login-form'>
        <div>
          username:
          <input
            type='text'
            value={username}
            name='Username'
            id='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            type='password'
            value={password}
            name='Password'
            id='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit' id='login-button'>login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired
}

export default LoginForm

