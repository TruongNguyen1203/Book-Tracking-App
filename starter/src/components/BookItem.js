const { default: ShelfDropdown } = require("./ShelfDropdown")

const BookItem = ({book, onChangeShelf}) => {
const handleChangeShelf = (newShelf) => {
    onChangeShelf(book, newShelf)
}
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                `url(${book.imageLinks?.thumbnail || ""})`,
            }}
          ></div>
          <ShelfDropdown selectedValue={book.shelf} onChangeShelf={handleChangeShelf}></ShelfDropdown>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors?.join(",")}</div>
      </div>
    </li>
  );
};

export default BookItem;
