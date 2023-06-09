import BookItem from "./BookItem";
import Shelves from "../utils/Contants";
const BookShelf = ({books, shelfTittle, onChangeShelf}) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{Shelves[shelfTittle]}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book, index) => (
            <BookItem key={index} book={book} onChangeShelf={onChangeShelf}></BookItem>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
