import React from "react";

class CategoryListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: this.props.item.text,
      isWrite: false
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

  // onfocusout과 같은 기능 - S
  // < 코드 분석하기...!! 분석전 >
  focusInCurrentTarget = ({ relatedTarget, currentTarget }) => {
    if (relatedTarget === null) return false;

    var node = relatedTarget.parentNode;

    while (node !== null) {
      if (node === currentTarget) return true;
      node = node.parentNode;
    }

    return false;
  };

  onBlur = e => {
    if (!this.focusInCurrentTarget(e)) {
      // this.props.handleTodoListTitleShow(this.state.value, this.state.cateId);
      this.setState({
        isWrite: false
      });
    }
  };
  // onfocusout과 같은 기능 - E

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
            onBlur={this.onBlur}
            autoFocus
          />
        ) : null}
        <label
          className="cate-item"
          onDoubleClick={this.handelLabelDoubleClick}
          onClick={this.props.clickCategoryItem.bind(
            null,
            this.state.inputValue
          )}
        >
          {this.state.inputValue}
        </label>
      </li>
    );
  }
}

export default CategoryListItem;
