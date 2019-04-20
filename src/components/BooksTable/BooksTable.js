import React from "react";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";

const booksTable = props => {
  const books = props.books.map(book => (
    <tr key={book.id}>
      <td>{book.id}</td>
      <td>{book.book_title}</td>
      <td>{book.book_author}</td>
      <td>{book.book_pages}</td>
      <td>{book.book_publication_city}</td>
      <td>{book.book_publication_country}</td>
      <td>{book.book_publication_year}</td>
    </tr>
  ));
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Author</th>
          <th>Pages</th>
          <th>Publication City</th>
          <th>Publication Country</th>
          <th>Publication Year</th>
        </tr>
      </thead>
      <tbody>{books}</tbody>
    </Table>
  );
};

booksTable.propTypes = {
  books: PropTypes.array.isRequired
};

export default booksTable;
