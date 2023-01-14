import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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

  if (user === null) {
    return (
      <div>
        <h2>login</h2>
        <LoginForm
          username={username}
          password={password}
          handleUser={setUser}
          handleUsername={setUsername}
          handlePassword={setPassword}
          />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <span>
        <p>Welcome {user.name}!</p>
        <LogoutButton handleUser={setUser} />
      </span>
      <h2>create new</h2>
      <BlogForm />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
