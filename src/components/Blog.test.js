import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'My blog!',
  author: 'Marry Poppins',
  likes: 100,
  url: 'myblog.io',
  user_id: 1,
  user: {
    name: 'Franklin D. Jones'
  }
}

const user = {
  id: 1
}


test('renders with title and author', () => {
  const {container} = render(<Blog blog={blog} user={user} />)

  const defaults = container.querySelector('#blog-defaults')
  expect(defaults).toHaveTextContent(blog.title)
  expect(defaults).toHaveTextContent(blog.author)

  // queryByText() makes most sense as these shouldn't be rendered
  // to the screen.
  // container.querySelector() will return as these elements are
  // in the HTML but {display: none}
  const url = screen.queryByText(blog.url)
  expect(url).toBeNull()

  const likes = screen.queryByText(blog.likes)
  expect(likes).toBeNull()

})

test('renders with url and likes when toggled', async () => {
  render(<Blog blog={blog} user={user} handle />)

  const session = userEvent.setup()
  const viewButton = screen.getByText('view')

  await session.click(viewButton)

  const url = screen.queryByText(blog.url, {exact:false})
  expect(url).not.toBeNull()

  const likes = screen.queryByText(blog.likes, {exact:false})
  expect(likes).not.toBeNull()

})

test('renders with url and likes when toggled', async () => {
  const mockHandler = jest.fn()
  render(<Blog blog={blog} user={user} handleLike={mockHandler} />)

  const session = userEvent.setup()
  const likeButton = screen.getByText('like')

  await session.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(1)

})
