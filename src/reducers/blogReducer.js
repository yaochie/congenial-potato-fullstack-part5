import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      return action.data

    case 'NEW_BLOG':
      return state.concat(action.data)

    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data)

    case 'LIKE_BLOG':
      return state.map(blog =>
        blog.id === action.data
          ? { ...blog, likes: blog.likes + 1 }
          : blog
      )

    case 'UPDATE_BLOG':
      return state.map(blog =>
        blog.id === action.data.id
          ? { ...blog, ...action.data }
          : blog
      )

    default:
      return state
  }
}

export const createBlog = (blogObject, user) => {
  return async dispatch => {
    const response = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: {
        ...response,
        user: {
          id: response.use,
          username: user.username,
          name: user.name
        }
      }
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export const likeBlog = (updatedBlog, id) => {
  return async dispatch => {
    const response = await blogService.update(updatedBlog, id)
    dispatch({
      type: 'UPDATE_BLOG',
      data: { likes: response.likes, id: id }
    })
  }
}

export const addComment = (comment, id) => {
  return async dispatch => {
    const response = await blogService.addComment(comment, id)
    dispatch({
      type: 'UPDATE_BLOG',
      data: { comments: response.comments, id: id }
    })
  }
}

export default blogReducer
