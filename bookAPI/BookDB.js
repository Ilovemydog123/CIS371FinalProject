var sqlite3 = require('sqlite3').verbose();

class BookDB {

    static initialize() {
        this.db.serialize(() => {
            this.db.run('CREATE TABLE Books (id INTEGER PRIMARY KEY, title TEXT NOT NULL, author TEXT NOT NULL, genre TEXT NOT NULL, read TEXT NOT NULL, rating TEXT NOT NULL);');
            this.db.run('INSERT INTO Books (title, author, genre, read, rating) VALUES ("title", "author", "genre", "read", "rating");');
        });
    }

    static all() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * from Books', (err, rows) => {
                resolve(rows);
            });
        });
    }

    // Notice that there is *a lot* of error handling missing here.
    static find(id) {
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT * from Books where (id == ${id})`, (err, rows) => {
                if (rows.length >= 1) {
                    console.log("resolving");
                    resolve(rows[0]);
                } else {
                    console.log("rejecting");
                    reject(`Book with Id ${id} not found`);
                }
            });
        });
    }

    static create(book) {
        let sql = `INSERT INTO Books (title, author, genre, read, rating) VALUES ("${book.title}", "${book.author}", "${book.genre}", "${book.read}", "${book.rating}");`;
        return new Promise((resolve, reject) => {
            console.log('The sql: ');
            console.log(sql);

            this.db.run(sql, function (err, rows) {
                console.log("This: ");
                console.log(this);
                if (err) {
                    console.log('Create Error');
                    console.log(err);
                    reject(err);
                } else {
                    resolve({ id: this.lastID, ...book })
                }
            });
        })
    }

    static update(book) {
        let sql = `UPDATE Books SET title="${book.title}", author="${book.author}", genre="${book.genre}", "${book.read}", "${book.rating}" WHERE id="${book.id}"`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, function (err, rows) {
                if (err) {
                    console.log('Update Error');
                    console.log(err);
                    reject(err);
                } else {
                    resolve({ success: true });
                }
            });
        });
    }

    static delete(book) {
        let sql = `DELETE from Books WHERE id="${book.id}"`;
        return new Promise((resolve, reject) => {
            this.db.run(sql, function (err, rows) {
                if (err) {
                    console.log('Delete Error');
                    console.log(err);
                    reject(err);
                } else {
                    resolve({ success: true });
                }
            });
        });
    } // end delete
} // end BookDB

BookDB.db = new sqlite3.Database('blog.sqlite');

module.exports = BookDB;