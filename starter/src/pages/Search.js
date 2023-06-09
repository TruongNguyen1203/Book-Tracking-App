import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { search } from "../utils/BooksAPI";
import BookItem from "../components/BookItem";

const Search = ({ onChangeShelf, bookShelves }) => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      if (query === "" || query === " ") {
        setBooks([]);
      } else {
        search(query)
          .then((data) => {
            if (Array.isArray(data)) {
              const searchBooks = data.map((book) => {
                let isFound = false;
                let foundShelf = "";
                Object.keys(bookShelves).forEach((key) => {
                  const found = bookShelves[key].some((e) => e.id === book.id);
                  if (found) {
                    isFound = true;
                    foundShelf = key;
                    return;
                  }
                });

                if (isFound) {
                  return { ...book, shelf: foundShelf };
                } else {
                  return { ...book, shelf: "none" };
                }
              });
              setBooks(searchBooks);
            } else {
              setBooks([]);
            }
          })
          .catch((err) => console.log(err));
      }
    }, 500);
    return () => clearTimeout(timeOutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books &&
            books.map((book, index) => (
              <BookItem
                book={book}
                key={index}
                onChangeShelf={onChangeShelf}
              ></BookItem>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
