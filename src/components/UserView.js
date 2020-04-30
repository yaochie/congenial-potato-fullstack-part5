import React, { useState, useEffect } from 'react'

import userService from '../services/users'

const UserView = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await userService.getUserInfo()
      setUsers(users)
    }
    fetchUsers()
  }, [])

  const userEntry = user => (
    <tr key={user.id}>
      <td>{user.name}</td>
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

