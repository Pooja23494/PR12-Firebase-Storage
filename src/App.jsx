import React, { useEffect, useState } from "react";
import {
  createBook,
  deleteBook,
  getAllData,
  updateBook,
} from "./features/book/bookSlice";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const [book, setBook] = useState({});
  const { books } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllData());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (book.id) {
      dispatch(updateBook(book));
    } else {
      dispatch(createBook(book));
    }
    setBook({});
  };

  const handleEdit = (book) => {
    setBook(book);
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form
              action=""
              method="post"
              className="card p-4 my-5"
              onSubmit={handleSubmit}
            >
              <h2 className="text-center mb-4">Add Book</h2>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={book.title || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="author" className="form-label">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={book.author || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={book.price || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-dark">
                {book.id ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <table className="table table-bordered caption-top mb-5">
              <caption>
                <h2>Books Details</h2>
              </caption>
              <thead className="table-dark">
                <tr>
                  <th>#.</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {books.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.price}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger me-2"
                        onClick={() => dispatch(deleteBook(item.id))}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
