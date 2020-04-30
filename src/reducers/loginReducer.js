import blogService from '../services/blogs'

// contain user info

const loginReducer = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN':
      return action.data

    case 'LOGOUT':
      return null

    default:
      return state
  }
}

export const login = (user) => {
  blogService.setToken(user.token)
  return {
    type: 'LOGIN',
    data: user
  }
}

export const logout = () => {
  blogService.setToken(null)
  return { type: 'LOGOUT' }
}

export default loginReducer
