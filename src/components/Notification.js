import React from 'react'
import { useSelector } from 'react-redux'

import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const message = useSelector(state => state.notification.message)

  if (message === null) {
    return null
  }

  /*
  return (
    <div className={message.type}>
      {message.text}
    </div>
  )
  */

  const variant = message.type === 'success' ? 'success' : 'danger'

  return (
    <Alert variant={variant}>
      {message.text}
    </Alert>
  )
}

export default Notification
