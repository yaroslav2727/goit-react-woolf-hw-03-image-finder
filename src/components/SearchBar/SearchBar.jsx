import { Component } from "react";
import { toast, Toaster } from "react-hot-toast";

import css from "./SearchBar.module.css";

class SearchBar extends Component {
  state = {
    query: "",
    prevQuery: "",
  };

  handleChange = e => this.setState({ query: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    const inputValue = this.state.query.trim();
    if (!inputValue) {
      toast.error("Please enter a valid query");
      this.setState({ query: "" });
      return;
    }
    if (inputValue === this.state.prevQuery) {
      toast.error("Please enter another query");
      return;
    }
    this.props.onSubmit(inputValue);
    this.setState({ query: "", prevQuery: inputValue });
  };

  render() {
    const { query } = this.state;
    return (
      <>
        <Toaster position="top-right" reverseOrder={false} />
        <header>
          <form className={css.form} onSubmit={this.handleSubmit}>
            <input
              type="text"
              autoComplete="off"
              placeholder="Search images"
              value={query}
              onChange={this.handleChange}
            />
            <button className={css.search} type="submit">
              Search
            </button>
          </form>
        </header>
      </>
    );
  }
}

export default SearchBar;
