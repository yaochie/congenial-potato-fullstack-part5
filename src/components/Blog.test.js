import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      author: 'The Author',
      title: 'The Title',
      url: 'this.site',
      likes: 5
    }

    component = render(
      <Blog blog={blog} />
    )
  })

  test('renders title, author but not url, # of likes by default', () => {
    expect(component.container).toHaveTextContent('The Author')
    expect(component.container).toHaveTextContent('The Title')

    expect(component.container).not.toHaveTextContent('this.site')
    expect(component.container).not.toHaveTextContent('likes 5')

    const div = component.container.querySelector('.basic-info')
    expect(div).toHaveTextContent('The Author')
    expect(div).toHaveTextContent('The Title')
  })

  test('shows url and # of likes when show button is clicked', () => {
    const button = component.getByText('show details')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('this.site')
    expect(component.container).toHaveTextContent('likes 5')

    const div = component.container.querySelector('.extra-info')
    expect(div).toHaveTextContent('this.site')
    expect(div).toHaveTextContent('likes 5')
  })
})
