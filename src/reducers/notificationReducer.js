const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_MESSAGE': {
      if (state !== null && state.timeoutId !== null) {
        clearTimeout(state.timeoutId)
      }
      return action.data
    }
    default:
      return state
  }
}

export const setNotification = (message, timeout) => {
  return async dispatch => {
    let timeoutId
    if (!(timeout === undefined || timeout === 0)) {
      timeoutId = setTimeout(() => dispatch({
        type: 'SET_MESSAGE',
        data: null
      }), timeout * 1000)
    } else {
      timeoutId = null
    }

    dispatch({
      type: 'SET_MESSAGE',
      data: {
        message,
        timeoutId
      }
    })
  }
}

export default notificationReducer

