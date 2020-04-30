import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

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
      <h2>Users</h2>
      <Table bordered hover size="sm">
        <thead>
          <tr>
            <th>User</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => userEntry(user))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserView

