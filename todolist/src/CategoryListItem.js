import React from "react";

class CategoryListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "새목록",
      isWrite: true
    };
  }

  handleInputChange = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  handelLabelDoubleClick = () => {
    this.setState({
      isWrite: true
    });
  };

  inputEditComplete = e => {
    console.log("this.props.itemId ? ", this.props.itemId);
    if (e.which === 13) {
      this.props.editCategoryItem(e.target.value, this.props.itemId);
      this.setState({
        isWrite: false
      });
    }
  };

  render() {
    // console.log("this.props.itemId ? ", this.props.itemId);
    return (
      <li>
        {this.state.isWrite ? (
          <input
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            onKeyPress={this.inputEditComplete}
            autoFocus
          />
        ) : null}
        <label
          className="cate-item"
          onDoubleClick={this.handelLabelDoubleClick}
        >
          {this.state.inputValue}
        </label>
      </li>
    );
  }
}

export default CategoryListItem;
