import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import NotificationHeader from './components/NotificationHeader'
import Togglable from './components/Togglable'
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

  // TODO: Could move to Blog/Like Button
  // Requires passing blogs into child components
  const handleLike = async (blog) => {
    const newBlog = await blogService.like(blog)
    const oldBlogs = blogs.filter((b) => b.id !== blog.id)
    setBlogs(oldBlogs.concat(newBlog))
  }

  const handleDelete = async (blog) => {
    const confirmText = `Are you sure you want to delete ${blog.title}?`

    if (window.confirm(confirmText)) {
      await blogService.remove(blog)
      const newBlogs = blogs.filter((b) => b.id !== blog.id)
      setBlogs(newBlogs)
    }
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
      <Togglable buttonLabel='new blog'>
        <BlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          handleNotification={handleNotification}
        />
      </Togglable>
      {blogs.sort((b1, b2) => b1.likes > b2.likes ? -1 : 1).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleDelete={handleDelete}
          handleLike={handleLike}
        />
      )}
    </div>
  )
}

export default App
