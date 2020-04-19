import React from 'react'
import BookForm from './BookForm'
import BookList from './BookList'
import API from '../API'
import PropTypes from 'prop-types'

function ErrorMessage ({ message }) {
  return <div className='errorMessage'>{message}</div>
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired
}

export default function Books () {
  const [bookList, setBookList] = React.useState([])
  const [loadingMessage, setLoadingMessage] = React.useState('Loading...')
  const [errorMessage, setErrorMessage] = React.useState(null)

  const [formMode, setFormMode] = React.useState('new')

  const emptyBook = { title: '', author: '', genre: '' }
  const [currentBook, setCurrentBook] = React.useState(emptyBook)

  // Note:  The {} around API.fetchBooks are important so that the block
  // passed to useEffect returns undefined (instead of the promise generated by fetch).
  React.useEffect(() => {
    API.fetchBooks().then(data => {
      setBookList(data)
      setLoadingMessage(null)
    }).catch((message) => {
      setLoadingMessage('Unable to load books because ' + message)
    })
  }, [])

  const updateBook = (field, value) => {
    const newBook = { ...currentBook }
    newBook[field] = value
    setCurrentBook(newBook)
  }

  const formSubmitted = () => {
    setErrorMessage(null)
    if (formMode === 'new') {
      API.postNewBook(currentBook).then(data => {
        console.log('Received data')
        console.log(data)
        if (data.id) {
          currentBook.id = data.id
          setBookList([...bookList, currentBook])
        } else {
          console.log("New book wasn't created.")
        }
      }).catch(message => setErrorMessage(`Failed to create new book: ${message}`))
    } else {
      API.updateBook(currentBook).then(() => {
        const newBookList = [...bookList]
        const bookIndex = bookList.findIndex((book) => book.id === currentBook.id)

        newBookList[bookIndex] = currentBook
        setBookList(newBookList)
      }).catch(message => setErrorMessage(`Failed to update book: ${message}`))
    }
  }

  const editClicked = (book) => {
    setErrorMessage(null)
    setFormMode('update')
    setCurrentBook(book)
  }

  const cancelClicked = () => {
    setErrorMessage(null)
    setFormMode('new')
    setCurrentBook(emptyBook)
  }

  const deleteClicked = (id) => {
    API.deleteBook(id).then(() => {
      setBookList(bookList.filter((item) => item.id !== id))
      cancelClicked()
    }).catch(message => setErrorMessage(`Failed to delete book: ${message}`))
  }

  const errorBlock = errorMessage ? <ErrorMessage message={errorMessage} /> : null

  return (
    <div className="books">
      {errorBlock}
      <BookForm formMode={formMode} book={currentBook} updateBook={updateBook}
        submitCallback={formSubmitted} cancelCallback={cancelClicked} />
      <div />
      {loadingMessage
        ? <p>{loadingMessage}</p>
        : <BookList books={bookList} onEditClicked={editClicked} onDeleteClicked={deleteClicked} />
      }
    </div>
  )
}