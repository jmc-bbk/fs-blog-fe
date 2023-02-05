import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (blog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const res = await axios.post(baseUrl, blog, config)
  
  return res.data
}

const like = async (blog) => {
  const url = `${baseUrl}/${blog.id}`

  const newLikes = blog.likes + 1
  const res = await axios.put(url, {likes: newLikes})

  return res.data
}

const remove = async (blog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const url = `${baseUrl}/${blog.id}`
  const res = await axios.delete(url, config)
  
  return res

}

export default { getAll, create, like, remove, setToken }
