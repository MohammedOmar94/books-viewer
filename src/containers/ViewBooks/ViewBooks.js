import React, { Component } from "react";

import axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import BooksTable from "../../components/BooksTable/BooksTable";

class ViewBooks extends Component {
  state = {
    books: [],
    numberOfBooks: 0,
    itemsPerPage: 20,
    pages: 0,
    page: 1
  };

  componentDidMount() {
    // Get first page of all books.
    this.getListOfBooks(1);
  }

  getListOfBooks = (requestedPage) => {
    axios
      .post("/api/books", {
        page: requestedPage,
        itemsPerPage: this.state.itemsPerPage,
        filters: []
      })
      .then(response => {
        const numberOfBooks = response.data.count;
        const numberOfPages = Math.ceil(
          numberOfBooks / this.state.itemsPerPage
        );
        this.setState({
          books: response.data.books,
          numberOfBooks: numberOfBooks,
          pages: numberOfPages,
          page: requestedPage
        });
      });
  }

  handleChangePage = pageNumber => {
    this.getListOfBooks(pageNumber);
  };

  render() {
    let items = [];
    for (let number = 1; number <= this.state.pages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === this.state.page}
          onClick={() => this.handleChangePage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return (
      <div>
        <BooksTable
          books={this.state.books}
          pages={this.state.pages}
          page={this.state.page}
        />
        <Pagination>{items}</Pagination>
      </div>
    );
  }
}

export default ViewBooks;
