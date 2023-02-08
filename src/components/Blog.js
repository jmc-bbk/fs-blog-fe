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
    <div style={blogStyle}>
      <div>
        <p>{blog.title} by {blog.author}</p>
      </div>
      <div>
        <Togglable buttonLabel='view'>
          <p>Likes: {blog.likes}</p>
          <button onClick={() => handleLike(blog)}>like</button>
          <p>User: {blog.user.name}</p>
          <p>URL: {blog.url}</p>
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