import React, { useState } from 'react'
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
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export default LoginForm

