import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import './App.css'
 
class BooksApp extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  getBooks = () => {
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

  componentDidMount() {
    this.getBooks()
  }

  updateShelf = ((book, event) => {
    const futureShelf = event.target.value
    BooksAPI.update(book, futureShelf).then(() => 
      this.getBooks()
    )
  })

  render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
            <SearchBooks
              onClose={() => history.push('/')}
              updateShelf={this.updateShelf}
            />
          )}
        />
        <Route exact path='/' render={({ history }) => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <BookShelf title='Currently Reading' books={this.state.currentlyReading} updateShelf={this.updateShelf}/>
                <BookShelf title='Want to Read' books={this.state.wantToRead} updateShelf={this.updateShelf}/>
                <BookShelf title='Read' books={this.state.read} updateShelf={this.updateShelf}/>
              </div>
              <div className="open-search">
                <button onClick={() => history.push('/search')}>Add a book</button>
              </div>
            </div>
          )}
        />
      </div>
    )
  }
}

export default BooksApp
