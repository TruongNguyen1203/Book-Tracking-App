import "./App.css";
import { useState, useEffect } from "react";
import { getAll, update } from "./utils/BooksAPI";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import { Routes, Route } from "react-router-dom";

function App() {
  const [bookShelves, setBookShelves] = useState({
    currentlyReading: [],
    wantToRead: [],
    read: [],
    none: [],
  });

  const handleChangeShelf = (book, newShelf) => {
    update(book, newShelf)
      .then((data) => {
        const oldBookShelf = bookShelves[book.shelf].filter(
          (b) => b.id !== book.id
        );
        const oldShelf = book.shelf;
        book.shelf = newShelf;
        const newBookShelf = [...bookShelves[newShelf], book];

        setBookShelves((prev) => ({
          ...prev,
          [oldShelf]: oldBookShelf,
          [newShelf]: newBookShelf,
        }));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAll()
      .then((data) => {
        const result = data.reduce((group, arr) => {
          const { shelf } = arr;
          group[shelf] = group[shelf] ?? [];
          group[shelf].push(arr);
          return group;
        }, {});
        setBookShelves((prev) => ({ ...prev, ...result }));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Dashboard
              bookShelves={bookShelves}
              onChangeShelf={handleChangeShelf}
            ></Dashboard>
          }
        ></Route>
        <Route
          path="/search"
          element={
            <Search
              bookShelves={bookShelves}
              onChangeShelf={handleChangeShelf}
            ></Search>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
