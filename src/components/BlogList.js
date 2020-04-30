import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const sortByLikes = (a, b) => a.likes < b.likes

  const blogRow = (blog) => (
    <tr key={blog.id}>
      <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
      <td>{blog.author}</td>
    </tr>
  )

  return (
    <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        {blogs.sort(sortByLikes).map(blog => blogRow(blog))}
      </tbody>
    </Table>
  )
}

export default BlogList
