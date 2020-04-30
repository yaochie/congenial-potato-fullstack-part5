import React from 'react'
import { useDispatch } from 'react-redux'

import loginService from '../services/login'

import Notification from './Notification'

import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async event => {
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value

    event.target.username.value = ''
    event.target.password.value = ''

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      dispatch(login(user))
      dispatch(setNotification(null))
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
            name='username'
            id='username'
          />
        </div>
        <div>
          password:
          <input
            type='password'
            name='password'
            id='password'
          />
        </div>
        <button type='submit' id='login-button'>login</button>
      </form>
    </div>
  )
}

export default LoginForm

