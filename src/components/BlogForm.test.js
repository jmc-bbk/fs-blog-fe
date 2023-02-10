import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'

jest.mock('../services/blogs')

describe('BlogForm', () => {
  test('calls event handler with correct details when new blog is created', async () => {
    const mockHandleNotification = jest.fn()
    const mockSetBlogs = jest.fn()

    blogService.create.mockResolvedValue({
      title: 'My Blog Title',
      author: 'My Blog Author',
      url: 'https://example.com'
    })

    const {container} = render(
      <BlogForm
        blogs={[]}
        setBlogs={mockSetBlogs}
        handleNotification={mockHandleNotification}
      />
    )

    const titleInput = container.querySelector('#blog-form-input-title')
    const authorInput = container.querySelector('#blog-form-input-author')
    const urlInput = container.querySelector('#blog-form-input-url')
    const submitButton = container.querySelector('#blog-form-button-submit')

    const session = userEvent.setup()

    await session.type(titleInput, 'My Blog Title')
    await session.type(authorInput, 'My Blog Author')
    await session.type(urlInput, 'https://example.com')

    await session.click(submitButton)

    expect(mockHandleNotification).toHaveBeenCalledWith(
      'Blog My Blog Title by My Blog Author has been added!'
    )
    expect(mockSetBlogs).toHaveBeenCalledWith([
      {title: 'My Blog Title', author: 'My Blog Author', url: 'https://example.com'}
    ])
  })
})
