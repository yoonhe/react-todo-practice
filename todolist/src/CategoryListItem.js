import React from "react";

class CategoryListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: this.props.item.text
    };
  }

  handleInputChange = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  inputEditComplete = e => {
    if (e.which === 13) {
      this.props.editCategoryItem(
        this.props.item.text,
        e.target.value,
        this.props.itemId
      );
      this.props.categoryInputTextNoLock(this.props.item.key);
    }
  };

  onBlur = e => {
    this.setState({
      isWrite: false
    });
  };

  render() {
    let style = {
      background: this.props.item.isClick ? "#222" : null
    };

    return (
      <li style={style}>
        {this.props.item.isWrite ? (
          <input
            style={style}
            type="text"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            onKeyPress={this.inputEditComplete}
            onBlur={() =>
              this.props.categoryInputTextNoLock(this.props.item.key)
            }
            autoFocus
          />
        ) : null}
        <label
          className="cate-item"
          onDoubleClick={() =>
            this.props.categoryInputTextNoLock(this.props.item.key)
          }
          onClick={() => {
            this.props.clickCategoryItem(
              this.state.inputValue,
              this.props.item.key
            );
          }}
        >
          {this.state.inputValue}
        </label>
      </li>
    );
  }
}

export default CategoryListItem;
