const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
      return state.concat(action.data)
    default:
      return state
  }
}

export const createBlog = (content) => {
}

export default blogReducer
