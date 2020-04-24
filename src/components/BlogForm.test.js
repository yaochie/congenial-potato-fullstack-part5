import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('calls event handler with correct props', async () => {
    const addBlog = jest.fn()

    const component = render(
      <BlogForm addBlog={addBlog} />
    )

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')

    fireEvent.change(author, {
      target: { value: 'The Author' }
    })
    fireEvent.change(title, {
      target: { value: 'The Title' }
    })
    fireEvent.change(url, {
      target: { value: 'mysite.com' }
    })

    const form = component.container.querySelector('form')
    // handleCreation is async, so need to wait
    await wait(() => { fireEvent.submit(form) })

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0]).toEqual({
      author: 'The Author',
      title: 'The Title',
      url: 'mysite.com'
    })
  })
})
