import {useState} from 'react'
import blogService from '../services/blogs'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log('blog submit')
      const blog = await blogService.create({
        title,
        author,
        url: url === '' ? null : url 
      })
      console.log(blog)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({target}) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({target}) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          name="URL"
          onChange={({target}) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm