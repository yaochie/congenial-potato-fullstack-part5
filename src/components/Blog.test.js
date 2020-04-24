import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog

  beforeEach(() => {
    blog = {
      author: 'The Author',
      title: 'The Title',
      url: 'this.site',
      likes: 5
    }
  })

  test('renders title, author but not url, # of likes by default', () => {
    const component = render(
      <Blog blog={blog} />
    )

    expect(component.container).toHaveTextContent('The Author')
    expect(component.container).toHaveTextContent('The Title')

    expect(component.container).not.toHaveTextContent('this.site')
    expect(component.container).not.toHaveTextContent('likes 5')

    const div = component.container.querySelector('.basic-info')
    expect(div).toHaveTextContent('The Author')
    expect(div).toHaveTextContent('The Title')
  })

  test('shows url and # of likes when show button is clicked', () => {
    const component = render(
      <Blog blog={blog} />
    )

    const button = component.getByText('show details')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('this.site')
    expect(component.container).toHaveTextContent('likes 5')

    const div = component.container.querySelector('.extra-info')
    expect(div).toHaveTextContent('this.site')
    expect(div).toHaveTextContent('likes 5')
  })

  test('clicking likes twice', () => {
    const addLike = jest.fn()

    const component = render(
      <Blog blog={blog} addLike={addLike} />
    )

    const button = component.getByText('show details')
    fireEvent.click(button)

    const likeButton = component.container.querySelector('.add-like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(addLike.mock.calls).toHaveLength(2)
  })
})
