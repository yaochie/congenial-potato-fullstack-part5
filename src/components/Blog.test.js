import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('<Blog /> renders title, author but not url, # of likes by default', () => {
  const blog = {
    author: 'The Author',
    title: 'The Title',
    url: 'this.site',
    likes: 5
  }

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
