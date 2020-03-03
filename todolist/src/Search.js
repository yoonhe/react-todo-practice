import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };
  }

  inputChange = e => {
    this.props.searchInputChange(e.target.value);
    this.setState({
      value: e.target.value
    });
  };

  handleKeyDownEsc = e => {
    if (e.which === 27) {
      this.props.searchInputChange("");
    }
  };

  render() {
    return (
      <div className="search-box">
        <input
          type="text"
          onChange={this.inputChange}
          onKeyDown={this.handleKeyDownEsc}
          placeholder="검색어를 입력하세요"
          value={
            this.props.searchValue === ""
              ? this.props.searchValue
              : this.state.value
          }
        />
        <span className="search-ico">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
    );
  }
}

export default Search;
