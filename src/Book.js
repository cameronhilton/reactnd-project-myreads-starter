import React, { Component } from 'react'

class Book extends Component {
  render() {
    const { authors, imageLinks, shelf, title } = this.props.book

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 193,
                     backgroundImage: `url(${imageLinks && imageLinks.thumbnail})` }}>
          </div>
          <div className="book-shelf-changer">
            <select
              defaultValue={'move'}
              onChange={this.props.updateShelf.bind(null, this.props.book)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading" disabled={shelf === 'currentlyReading'}>Currently Reading</option>
              <option value="wantToRead" disabled={shelf === 'wantToRead'}>Want to Read</option>
              <option value="read" disabled={shelf === 'read'}>Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">
          {authors && authors.map((author, idx) => (
            <span key={author}>
              {author}
              {idx < authors.length - 1 && <span style={{ paddingRight: '3px'}}>,</span>}
            </span>
          ))}
        </div>
      </div>
    )
  }
}

export default Book
