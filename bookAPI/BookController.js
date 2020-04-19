const BookDB = require('./BookDB');
const Book = require('./Book')

class BookController {

    async index(req, res) {     
        res.send(await BookDB.all())
    }

    async show(req, res) {
        let id = req.params.id;
        let book = await BookDB.find(id);

        if (!book) {
            res.send("Could not find a book with id of " + id);
        } else {
            res.send(book);
        }
    }

    async create(req, res) {
        console.log("About to add book");
        console.log(req.body);

        let newBook = req.body;

        // Quick and dirty validation
        if (Book.isValid(newBook, await BookDB.all())) {
            // The 'data' contains the id (primary key) of newly added book
            BookDB.create(newBook).then(data => res.send(data));
        } else {
            // Send a 422 response.
            res.status(422);
            res.send({ message: newBook.errors.join(": ") });
        }
    }

    async update(req, res) {
        let newBook = req.body;
        console.log("Proposed update: ");
        console.log(newBook);
        let id = req.params.id;
        let book = await BookDB.find(id);

        if (!book) {
            res.status(404);
            res.send("Could not find a book with id of " + id);
        } else {
            if (Book.isValid(newBook, await BookDB.all())) {
                // Indicate that the response is successful, but has no body.
                BookDB.update(newBook).then(() => {
                    res.status(204);
                    res.send();
                });
            } else {
                // Send a 422 response.
                res.status(422);
                res.send({ message: newBook.errors.join(": ") });
            }
        }
    }

    async delete(req, res) {
        let id = req.params.id;
        let book = await BookDB.find(id);
        if (!book) {
            res.status(404);
            res.send("Could not find a book with id of " + id);
        } else {
            BookDB.delete(book).then(() => {
                res.status(204);
                res.send();
            }).catch((message) => {
                res.status(500);
                res.send("Server error: " + message);
            });
        }
    } // end delete
}
module.exports = BookController;