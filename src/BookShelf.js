import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.books.length > 0 &&
                this.props.books.map((book) => {
                  return book.shelf === this.props.shelf &&
                    <li key={book.id}>
                      <Book book={book} updateShelf={this.props.updateShelf}/>
                    </li>
                })
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
