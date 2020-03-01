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

  render() {
    return (
      <div className="search-box">
        <input
          type="text"
          onChange={this.inputChange}
          placeholder="검색어를 입력하세요"
        />
        <span className="search-ico">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>
    );
  }
}

export default Search;
