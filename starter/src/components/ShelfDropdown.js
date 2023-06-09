const ShelfDropdown = ({ selectedValue, onChangeShelf }) => {
  const handleChangeShelf = (e) => {
    onChangeShelf(e.target.value);
  };
  return (
    <div className="book-shelf-changer">
      <select value={selectedValue || "none"} onChange={handleChangeShelf}>
        <option value="" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
};
export default ShelfDropdown;
