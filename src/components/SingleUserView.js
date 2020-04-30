import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SingleUserView = () => {
  const id = useParams().id
  const user = useSelector(state => state.users.find(user => user.id === id))

  if (!user) {
    return (
      <>
        <div>User not found.</div>
        <div><Link to='/users'>Return to main user page</Link></div>
      </>
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
