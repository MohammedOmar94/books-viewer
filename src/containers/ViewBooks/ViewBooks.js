import React, { Component } from "react";

import { createBrowserHistory } from 'history';
import queryString from 'query-string';

import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Pagination from "react-bootstrap/Pagination";
import BooksTable from "../../components/BooksTable/BooksTable";

class ViewBooks extends Component {
  state = {
    books: [],
    numberOfBooks: 0,
    itemsPerPage: 0,
    pages: 0,
    page: 1
  };

  componentDidMount() {
    // Get the current location.
    const history = createBrowserHistory();
    const location = history.location;
    // Get results according to URL parameters.
    if (location.search) {
      // Parse query params.
      const queryParams = queryString.parse(location.search)
      const page = parseInt(queryParams.p);
      const itemsPerPage = parseInt(queryParams.items)
      this.getListOfBooks(page, itemsPerPage);
    } else {
      // Get first page of all books, 20 items per page.
      this.getListOfBooks(1, 20);
    }
  }

  getListOfBooks = (requestedPage, itemsPerPage) => {
    axios
      .post("/api/books", {
        page: requestedPage,
        itemsPerPage: itemsPerPage,
        filters: []
      })
      .then(response => {
        const numberOfBooks = response.data.count;
        const numberOfPages = Math.ceil(
          numberOfBooks / itemsPerPage
        );
        this.setState({
          books: response.data.books,
          numberOfBooks: numberOfBooks,
          pages: numberOfPages,
          page: requestedPage,
          itemsPerPage: itemsPerPage
        });

        // Update URL with params.
        const history = createBrowserHistory();
        history.push('/?p=' + requestedPage + '&items=' + itemsPerPage);
      });
  };

  handleChangePage = pageNumber => {
    this.getListOfBooks(pageNumber, this.state.itemsPerPage);
  };

  handleChangeItemsPerPage = itemsPerPage => {
    this.getListOfBooks(this.state.page, itemsPerPage);
  }

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
        <DropdownButton id="dropdown-basic-button" title={"Items per page: " + this.state.itemsPerPage}>
          <Dropdown.Item onClick={() => this.handleChangeItemsPerPage(5)}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => this.handleChangeItemsPerPage(10)}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => this.handleChangeItemsPerPage(20)}>20</Dropdown.Item>
          <Dropdown.Item onClick={() => this.handleChangeItemsPerPage(50)}>50</Dropdown.Item>
        </DropdownButton>
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
