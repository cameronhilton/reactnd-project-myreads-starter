import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import './App.css'
 
class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then((books) => {
      let currentlyReading = []
      let wantToRead = []
      let read = []

      books.forEach((book) => {
        if (book.shelf === 'currentlyReading') {
          currentlyReading.push(book)
        } else if (book.shelf === 'wantToRead') {
          wantToRead.push(book)
        } else if (book.shelf === 'read') {
          read.push(book)
        }
      })

      this.setState(() => ({
        currentlyReading: currentlyReading,
        wantToRead: wantToRead,
        read: read
      }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
            <SearchBooks/>
          )}
        />
        <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <BookShelf title='Currently Reading' books={this.state.currentlyReading}/>
                <BookShelf title='Want to Read' books={this.state.wantToRead}/>
                <BookShelf title='Read' books={this.state.read}/>
              </div>
              <div className="open-search">
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
              </div>
            </div>
          )}
        />
        )}
      </div>
    )
  }
}

export default BooksApp
