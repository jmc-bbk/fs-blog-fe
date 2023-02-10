import Togglable from './Togglable'

// TODO: CSS is problematic here. Deliberately not fixing as
// it is not required for this part of the course.
const Blog = ({blog, user, handleLike, handleDelete}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div id='blog-container' style={blogStyle}>
      <div>
        <p id='blog-defaults'>{blog.title} by {blog.author}</p>
      </div>
      <div>
        <Togglable buttonLabel='view'>
          <p id='blog-likes'>Likes: {blog.likes}</p>
          <button onClick={() => handleLike(blog)}>like</button>
          <p id='blog-user'>User: {blog.user.name}</p>
          <p id='blog-url'>URL: {blog.url}</p>
          {
            user.id === blog.user_id
            &&
            <button onClick={() => handleDelete(blog)}>delete</button>
          }
        </Togglable>
      </div>
    </div>
  )
}

export default Blog