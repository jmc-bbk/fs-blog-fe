import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import NotificationHeader from './components/NotificationHeader'
import blogService from './services/blogs'

// TODO: Naming of handle and set is all messed up, need to come up with standardised convention.
// TODO: username, password are not required as states at the app level move to login.

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const userInStorage = window.localStorage.getItem('user')
    if (userInStorage) {
      const user = JSON.parse(userInStorage)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleNotification = (notification) => {
    setNotification(notification)
    setTimeout(() => {setNotification(null)}, 5000)
  }

  if (user === null) {
    return (
      <div>
        <h2>login</h2>
        <NotificationHeader notification={notification} />
        <LoginForm
          username={username}
          password={password}
          handleUser={setUser}
          handleUsername={setUsername}
          handlePassword={setPassword}
          handleNotification={handleNotification}
          />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <NotificationHeader notification={notification} />
      <span>
        <p>Welcome {user.name}!</p>
        <LogoutButton handleUser={setUser} />
      </span>
      <h2>create new</h2>
      <BlogForm handleNotification={handleNotification} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
