module.exports = class Book {

  static isValid(book, allBooks) {

    let errors = [];
    if (!book.title) {
      errors.push("Book must have a title.");
    }

    if (!book.author) {
      errors.push("Book must have an author.");
    }

    if (!book.genre) {
      errors.push("Book must have a genre.");      
    }

    if (!book.read) {
      error.push("Must answer yes or no.")
    }

    if (!book.rating) {
      error.push("Must be a number between 1 and 10.")
    }

   if (!Book.isUnique(book, allBooks)) {
     errors.push("Book has already been added.");
   }

   if (errors.length > 0) {
     book.errors = errors;
     return false;
   } else {
     return true;
   }
  }

  static isUnique(book, allBooks) {   
    return allBooks.filter((use) => use.title === book.title && use.id !== book.id).length === 0;
  }
}