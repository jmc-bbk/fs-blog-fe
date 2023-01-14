import login from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({
  username,
  password,
  handleUser,
  handleUsername,
  handlePassword
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
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleLogin}>
    <div>
      username
      <input
        type="text"
        value={username}
        name="Username"
        onChange={({target}) => handleUsername(target.value)}
      />
    </div>
    <div>
      password
      <input
        type="password"
        value={password}
        name="Password"
        onChange={({target}) => handlePassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
  )
}

export default LoginForm
