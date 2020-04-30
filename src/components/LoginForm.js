import React from 'react'
import { useDispatch } from 'react-redux'

import loginService from '../services/login'

import Notification from './Notification'

import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

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
      <Form onSubmit={handleLogin} id='login-form'>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type='text'
            name='username'
            id='username'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control
            type='password'
            name='password'
            id='password'
          />
        </Form.Group>
        <Button type='submit' id='login-button'>login</Button>
      </Form>
    </div>
  )
}

export default LoginForm

