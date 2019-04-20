import React, { Component } from "react";

import axios from "axios";
import BooksTable from "../../components/BooksTable/BooksTable";

class ViewBooks extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    axios
      .post("/api/books", {
        page: 1,
        itemsPerPage: 20,
        filters: []
      })
      .then(response => this.setState({ books: response.data.books }));
  }

  render() {
    return (
      <div>
        <BooksTable books={this.state.books} />
      </div>
    );
  }
}

export default ViewBooks;