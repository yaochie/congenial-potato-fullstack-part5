import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import userService from '../services/users'

import { initializeUsers } from '../reducers/userReducer'

const SingleUserView = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.find(user => user.id === id))

  console.log(id, user)

  if (!user) {
    return (
      <div>User not found.</div>
    )
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <div>
        <ul>
          {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default SingleUserView
