import React, { Component } from 'react'
import { search } from './BooksAPI'
import BooksGrid from './BooksGrid'

class SearchBooks extends Component {
  state = {
    query: '',
    searchedBooks: [],
    shelfMap: {}
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query
    }))

    search(query).then((searchedBooks) => {
      let shelfMap = {}
      this.props.books.forEach((book) => {
        shelfMap[book.id] = book.shelf
      })

      searchedBooks && !searchedBooks.error && searchedBooks
        .map((book) => {
          book.shelf = shelfMap[book.id] || 'none'
          return book
        })
      this.setState(() => ({
        searchedBooks: searchedBooks,
        shelfMap: shelfMap
      }))
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={this.props.onClose}>Close</button>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          {this.state.searchedBooks && this.state.searchedBooks.length > 0 &&
            <BooksGrid books={this.state.searchedBooks} updateShelf={this.props.updateShelf}/>}
        </div>
      </div>
    )
  }
}

export default SearchBooks
