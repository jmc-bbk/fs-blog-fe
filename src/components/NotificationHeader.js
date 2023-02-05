const NotificationHeader = ({notification}) => {
  if (notification === null) {
    return
  }
  
  return <h2>{notification}</h2>
}

export default NotificationHeader
