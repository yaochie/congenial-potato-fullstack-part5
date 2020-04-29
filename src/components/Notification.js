import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector(state =>
    state === null ? null : state.message
  )
  if (message === null) {
    return null
  }

  return (
    <div className={message.type}>
      {message.text}
    </div>
  )
}

export default Notification
