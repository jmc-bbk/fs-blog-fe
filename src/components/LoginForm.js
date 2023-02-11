import PropTypes from 'prop-types'
import login from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({
  username,
  password,
  handleUser,
  handleUsername,
  handlePassword,
  handleNotification
}) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login({username, password})
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      handleUser(user)
      handleUsername('')
      handlePassword('')
    } catch (error) {
      handleNotification('Invalid username or password, punk.')
      console.log(error)
    }
  }

  return (
    <form id='form-login' onSubmit={handleLogin}>
      <div>
      username
        <input
          id='input-username'
          type="text"
          value={username}
          name="Username"
          onChange={({target}) => handleUsername(target.value)}
        />
      </div>
      <div>
      password
        <input
          id='input-password'
          type="password"
          value={password}
          name="Password"
          onChange={({target}) => handlePassword(target.value)}
        />
      </div>
      <button id='button-submit' type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUser: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  handleNotification: PropTypes.func.isRequired
}

export default LoginForm
