import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom'

import userService from '../services/users'

import { initializeUsers } from '../reducers/userReducer'

const UserView = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const userEntry = user => (
    <tr key={user.id}>
      <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
      <td>{user.blogs.length}</td>
    </tr>
  )

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th />
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => userEntry(user))}
        </tbody>
      </table>
    </div>
  )
}

export default UserView

