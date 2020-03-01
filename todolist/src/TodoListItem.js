import React from "react";

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: this.props.todo.text,
      isWrite: true,
      isChecked: this.props.todo.isChecked
    };
  }

  handleInputChange = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  handleInputEnter = e => {
    if (e.which === 13) {
      this.props.editTodoItem(this.state.inputValue, this.props.todo.key);

      this.setState({
        isWrite: !this.state.isWrite
      });
    }
  };

  inputTextNoLock = () => {
    this.setState({
      isWrite: !this.state.isWrite
    });
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
      this.props.editTodoItem(this.state.inputValue, this.props.todo.key);
      this.setState({
        isWrite: false
      });
    }
  };
  // onfocusout과 같은 기능 - E

  clickCheckbox = () => {
    this.props.handleCheckTodoItem(this.props.todo.key);

    this.setState({
      isChecked: !this.state.isChecked
    });
  };

  render() {
    let checked = this.state.isChecked ? "checked" : "";

    return (
      <li>
        <span className="input-checkbox">
          <input
            className={checked}
            onChange={this.clickCheckbox}
            id={`item${this.props.index}`}
            type="checkbox"
          />
          <label htmlFor={`item${this.props.index}`}></label>
        </span>
        {this.state.isWrite ? (
          <input
            className="input-text"
            type="text"
            onChange={this.handleInputChange}
            onKeyPress={this.handleInputEnter}
            value={this.state.inputValue}
            onBlur={this.onBlur}
          />
        ) : (
          <input
            className="input-text"
            type="text"
            onChange={this.handleInputChange}
            onKeyPress={this.handleInputEnter}
            value={this.state.inputValue}
            onClick={this.inputTextNoLock}
            onFocus={this.inputTextNoLock}
            readOnly
          />
        )}
      </li>
    );
  }
}

export default TodoListItem;
