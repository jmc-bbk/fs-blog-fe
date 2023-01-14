import blogService from '../services/blogs'

const LogoutButton = ({handleUser}) => {

  const handleClick = () => {
    window.localStorage.removeItem('user')
    handleUser(null)
    blogService.setToken(null)
  }

  return (
    <button onClick={handleClick}>logout</button>
  )
}

export default LogoutButton
