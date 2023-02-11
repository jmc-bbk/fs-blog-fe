const NotificationHeader = ({notification}) => {
  if (notification === null) {
    return
  }

  return <h2 className='notification'> {notification}</h2>
}

export default NotificationHeader
