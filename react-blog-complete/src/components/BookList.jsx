import React from 'react'
import PropTypes from 'prop-types'

function BookListItem ({ book, onEditClicked, onDeleteClicked }) {
  // Notice that the buttons currently don't do anything when clicked.
  return (
    <tr>
      <td className="col-md-3">{book.title}</td>
      <td className="col-md-3">{book.author}</td>
      <td className="col-md-3">{book.genre}</td>
      <td className="col-md-3">{book.read}</td>
      <td className="col-md-3">{book.rating}</td>
      <td className="col-md-3 btn-toolbar">
        <button className="btn btn-success btn-sm" onClick={event => onEditClicked(book)}>
          <i className="glyphicon glyphicon-pencil"></i> Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={event => onDeleteClicked(book.id)}>
          <i className="glyphicon glyphicon-remove"></i> Delete
        </button>
      </td>
    </tr>
  )
}

BookListItem.propTypes = {
  book: PropTypes.object.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onDeleteClicked: PropTypes.func.isRequired
}

export default function BookList ({ books, onEditClicked, onDeleteClicked }) {
  const bookItems = books.map((book) => (
    <BookListItem key={book.id} book={book} onEditClicked={onEditClicked} onDeleteClicked={onDeleteClicked} />
  ))

  return (
    <div className="book-list">
      <table className="table table-hover">
        <thead>
          <tr>
            <th className="col-md-3">Title</th>
            <th className="col-md-3">Author</th>
            <th className="col-md-3">Genre</th>
            <th className="col-md-3">Read it?</th>
            <th className="col-md-3">Rating</th>
            <th className="col-md-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookItems}
        </tbody>
      </table>
    </div>
  )
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onDeleteClicked: PropTypes.func.isRequired
}
