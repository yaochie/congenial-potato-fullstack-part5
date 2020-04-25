import React, { useState } from 'react'
import PropTypes from 'prop-types'

import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setNotification(null)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
    } catch(exception) {
      setNotification({
        text: 'invalid credentials',
        type: 'error'
      })

      setTimeout(() => setNotification(null), 3000)
    }
  }

  return (
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
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default LoginForm

