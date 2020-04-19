import React from 'react'
import PropTypes from 'prop-types'

BookForm.propTypes = {
  book: PropTypes.object.isRequired,
  updateBook: PropTypes.func.isRequired,
  formMode: PropTypes.string.isRequired,
  submitCallback: PropTypes.func.isRequired,
  cancelCallback: PropTypes.func.isRequired
}

export default function BookForm ({ book, updateBook, formMode, submitCallback, cancelCallback }) {
  const cancelClicked = (event) => {
    event.preventDefault()
    cancelCallback()
  }

  // The form will have two different sets of buttons:
  // * A "Create" button when creating, and
  // * An "Update" and "Cancel" button when updating.
  const renderButtons = () => {
    if (formMode === 'new') {
      return (
        <button type="submit" className="btn btn-primary">Create</button>
      )
    } else {
      return (
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="submit" className="btn btn-danger" onClick={cancelClicked}>Cancel</button>
        </div>
      )
    }
  } // end renderButtons

  // In this version, the Books component needs access to the state so it can initialize the
  // form fields when the edit button is clicked.  Therefore we move the state up.

  const formSubmitted = (event) => {
    // Prevent the browser from re-loading the page.
    event.preventDefault()
    submitCallback()
  }

  return (
    <div className="book-form">
      <h1> Books </h1>
      <form onSubmit={formSubmitted}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" autoComplete='title' name="title" id="title"
            placeholder="Title" value={book.title} onChange={(event) => updateBook('title', event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input type="text" className="form-control" autoComplete='author' name="author" id="author"
            placeholder="Author" value={book.author} onChange={(event) => updateBook('author', event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre</label>
          <input type="genre" className="form-control" autoComplete='genre' name="genre" id="genre"
            placeholder="genre" value={book.genre} onChange={(event) => updateBook('genre', event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="read">Read it?</label>
          <input type="read" className="form-control" autoComplete='read' name="read" id="read"
            placeholder="Yes/No" value={book.read} onChange={(event) => updateBook('read', event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <input type="rating" className="form-control" autoComplete='rating' name="rating" id="rating"
            placeholder="1-10" value={book.genre} onChange={(event) => updateBook('rating', event.target.value)} />
        </div>
        {renderButtons()}
      </form>
    </div>
  )
}
