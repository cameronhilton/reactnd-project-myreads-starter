import React from 'react'

function Book(props) {
  const { authors, imageLinks, shelf, title } = props.book

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
            defaultValue={typeof shelf !== 'undefined' ? shelf : 'none'}
            onChange={props.updateShelf.bind(null, props.book)}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
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

export default Book
