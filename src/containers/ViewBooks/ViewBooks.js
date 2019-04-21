import React, { Component } from "react";

import { createBrowserHistory } from 'history';
import queryString from 'query-string';

import classes from './ViewBooks.module.css';
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
      // Get first page of all books, 20 items per page, with no search filter.
      this.getListOfBooks(1, 20, []);
    }
  }

  getListOfBooks = (requestedPage, itemsPerPage, search) => {
    let filters = [];
    // Check if search was used, then set the variable to be used within the POST request.
    if (search.length) {
      filters = [{type: "all", values: [search]}];
    }

    // Validation checks on the query params.
    if (itemsPerPage > 50 || isNaN(itemsPerPage)) {
      itemsPerPage = 50;
    } else if (itemsPerPage < 1) {
      itemsPerPage = 1;
    }

    if (requestedPage < 1 || isNaN(requestedPage)) {
      requestedPage = 1;
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
    // Create individual page button components.
    let items = [];
    const numberOfPages = this.state.pages;
    const moreThan10Pages =  numberOfPages > 10;
    const currentPage = this.state.page;

    if (moreThan10Pages &&  currentPage < 10) {
      // For the first 10 pages, just show the normal set of buttons.
      // Should be able to see a button to skip to the last page.
      for (let number = 1; number <= 10; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => this.handleChangePage(number)}
          >
            {number}
          </Pagination.Item>
        );
      }
      items.push(<Pagination.Ellipsis key='...'/>);
      items.push(<Pagination.Last key='last-page' onClick={() => this.handleChangePage(numberOfPages)} />);
    } else if (moreThan10Pages && currentPage >= 10 && currentPage < numberOfPages - 5) {
      // After the first 10 pages, and before the last 5 pages, I should see the first and last buttons.
      items.push(<Pagination.First key='first-page' onClick={() => this.handleChangePage(1)} />);
      items.push(<Pagination.Ellipsis key='...-01'/>);
      // The active page button should also be in the middle (spaced by 5).
      for (let number = currentPage - 5; number <= currentPage + 5; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => this.handleChangePage(number)}
          >
            {number}
          </Pagination.Item>
        );
      }
      items.push(<Pagination.Ellipsis key='...-02'/>);
      items.push(<Pagination.Last key='last-page' onClick={() => this.handleChangePage(numberOfPages)}/>);
    } else {
      // Once at the last 6 pages, you should be able to see the last page and a button to gp back to the first page.
      items.push(<Pagination.First key='first-page' onClick={() => this.handleChangePage(1)} />);
      items.push(<Pagination.Ellipsis key='...'/>);
      for (let number = numberOfPages - 6; number <= numberOfPages; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => this.handleChangePage(number)}
          >
            {number}
          </Pagination.Item>
        );
      }
    }

    let searchInfo = null;
    if (this.state.search.length) {
      searchInfo = <p className={classes.ResultsInfo}>
        Search results for <b>{this.state.search}, { this.state.numberOfBooks } results found.</b></p>;
    }

    return (
      <section className={classes.ViewBooks}>
        <section className={classes.Controls}>
          <DropdownButton id="dropdown-basic-button" title={"Items per page: " + this.state.itemsPerPage}>
            <Dropdown.Item onClick={() => this.handleChangeItemsPerPage(5)}>5</Dropdown.Item>
            <Dropdown.Item onClick={() => this.handleChangeItemsPerPage(10)}>10</Dropdown.Item>
            <Dropdown.Item onClick={() => this.handleChangeItemsPerPage(20)}>20</Dropdown.Item>
            <Dropdown.Item onClick={() => this.handleChangeItemsPerPage(50)}>50</Dropdown.Item>
          </DropdownButton>
          <Form.Control type='text' id='search'/>
          <Button onClick={this.handleSearch} variant="primary">Search</Button>
        </section>
        { searchInfo }
        <BooksTable
          books={this.state.books}
          pages={this.state.pages}
          page={this.state.page}
        />
        <Pagination>{items}</Pagination>
      </section>
    );
  }
}

export default ViewBooks;
