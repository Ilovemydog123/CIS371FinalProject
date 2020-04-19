import React from 'react'
import { render } from '@testing-library/react'
import BookForm from '../components/BookForm'

describe('dummy', () => {
  it('does something', () => {

    function Dummy () {
      return <span>Dummy</span>
    }

    let stuff = render(<Dummy />)
  })
})

describe('BookForm', () => {

  let props
  beforeEach(() => {
    props = {
      book: { title: '', author: '', genre: '' },
      updateBook: jest.fn(),
      formMode: 'new',
      submitCallback: jest.fn(),
      cancelCallback: jest.fn(),
    }
  })

  it('Initializes input fields to empty', () => {

    // Render Book form and keep the resulting DOM element.
    const { container } = render(<BookForm {...props} />)

    // Search the component for everything that matches the CSS 
    // selector "form input" (i.e., all the form inputs.)
    const inputElements = container.querySelectorAll('form input')

    // Assert that there are three of them.
    expect(inputElements.length).toBe(3)

    // Make sure each one is blank.
    inputElements.forEach((element) => expect(element.value).toEqual(''))
  })

  it('Initializes input fields when provided', () => {

    // Customize the props for this test.
    props.book = { title: 'The Shining', author: 'Stephen King', genre: 'Horror' }

    // Render BookForm
    const { container } = render(<BookForm {...props} />)

    // Get title input element, then verify it was initialized properly.
    const titleInput = container.querySelector('#title')
    expect(titleInput.value).toBe('The Shining')

    // Get author input element, then verify it was initialized properly.
    const authorInput = container.querySelector('#author')
    expect(authorInput.value).toBe('Stephen King')

    // Get genre input element, then verify it was initialized properly.
    const genreInput = container.querySelector('#genre')
    expect(genreInput.value).toBe('Horror')

    // Get read input element, then verify it was initialized properly.
    const readInput = container.querySelector('#read')
    expect(readInput.value).toBe('Yes')

    // Get rating input element, then verify it was initialized properly.
    const ratingInput = container.querySelector('#rating')
    expect(ratingInput.value).toBe('4')
  })

  it('has "Create" button in "new" mode', () => {
    props.formMode = 'new';
    const { container } = render(<BookForm {...props} />)

    // Look for all the buttons.
    const buttons = container.querySelectorAll('form button');
    // There should be exactly one.
    expect(buttons.length).toBe(1);
    // It should be "Create"
    expect(buttons[0].textContent).toEqual('Create');
  })

  it('has "Save" and "Cancel" buttons in "update" mode', () => {
    props.formMode = 'update';
    const { container } = render(<BookForm {...props} />)

    // Look for all the buttons.
    const buttons = container.querySelectorAll('form button');
    // There should be exactly two.
    expect(buttons.length).toBe(2);
    console.log("The buttons:");
    console.log(buttons);
    let text = buttons.map((b) => b.textContent);
    // It should be "Create"
    expect(buttons[0].textContent).toEqual(['Save', 'Cancel']);
  })

})
