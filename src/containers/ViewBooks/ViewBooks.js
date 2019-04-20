import React, { Component } from "react";

import { createBrowserHistory } from 'history';
import queryString from 'query-string';

import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import BooksTable from "../../components/BooksTable/BooksTable";

class ViewBooks extends Component {
  state = {
    history: createBrowserHistory(),
    books: [],
    numberOfBooks: 0,
    itemsPerPage: 0,
    pages: 0,
    page: 1,
    search: ''
  };

  componentDidMount() {
    // Get the current location.
    const location = this.state.history.location;
    // Get results according to URL parameters.
    if (location.search) {
      // Parse query params.
      const queryParams = queryString.parse(location.search)
      const page = parseInt(queryParams.p);
      const itemsPerPage = parseInt(queryParams.items)
      const search = queryParams.search ? queryParams.search : '';
      this.getListOfBooks(page, itemsPerPage, search);
    } else {
      // Get first page of all books, 20 items per page.
      this.getListOfBooks(1, 20);
    }
  }

  getListOfBooks = (requestedPage, itemsPerPage, search) => {
    let filters = [];
    // Check if search was used, then set the variable to be used within the POST request.
    if (search.length) {
      filters = [{type: "all", values: [search]}];
    }
    axios
      .post("/api/books", {
        page: requestedPage,
        itemsPerPage: itemsPerPage,
        filters: filters
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
          itemsPerPage: itemsPerPage,
          search: search
        });

        // Check if search was used, then update URL with params.
        if (search.length) {
          this.state.history.push('/?search=' + search + '&p=' + requestedPage + '&items=' + itemsPerPage);
        } else {
          this.state.history.push('/?p=' + requestedPage + '&items=' + itemsPerPage);
        }
      });
  };

  handleChangePage = pageNumber => {
    this.getListOfBooks(pageNumber, this.state.itemsPerPage, this.state.search);
  };

  handleChangeItemsPerPage = itemsPerPage => {
    // Note: Resets back to 1st page, avoids issue where no results are shown because page no longer exists.
    this.getListOfBooks(1, itemsPerPage, this.state.search);
  }

  handleSearch = () => {
    const search = document.querySelector('#search').value;

    const location = this.state.history.location;

    // Get results using URL parameters + Search field.
    const queryParams = queryString.parse(location.search)
    const itemsPerPage = parseInt(queryParams.items)
    this.getListOfBooks(1, itemsPerPage, search);
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

    const searchInfo = <p>Search results for <b>{this.state.search}, { this.state.numberOfBooks } results found.</b></p>;

    return (
      <div>
        <DropdownButton id="dropdown-basic-button" title={"Items per page: " + this.state.itemsPerPage}>
          <Dropdown.Item onClick={() => this.handleChangeItemsPerPage(5)}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => this.handleChangeItemsPerPage(10)}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => this.handleChangeItemsPerPage(20)}>20</Dropdown.Item>
          <Dropdown.Item onClick={() => this.handleChangeItemsPerPage(50)}>50</Dropdown.Item>
        </DropdownButton>
        <Form.Control type='text' id='search'/>
        <Button onClick={this.handleSearch} variant="primary">Search</Button>
        { searchInfo }
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
