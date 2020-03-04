import React from "react";

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: this.props.todo.text
    };
  }

  handleInputChange = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  handleInputEnter = e => {
    if (e.which === 13) {
      this.props.editTodoItemAndInputLock(
        this.state.inputValue,
        this.props.todo.key
      );
    }
  };

  onBlur = e => {
    this.props.editTodoItemAndInputLock(
      this.state.inputValue,
      this.props.todo.key
    );
  };

  clickCheckbox = () => {
    this.props.handleCheckTodoItem(this.props.todo.key);
  };

  render() {
    let checked = this.props.todo.isChecked ? "checked" : "";
    // 질문
    // readOnly on off가 좋은방법인지? input on off가 좋은 방법인지?
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
        {this.props.todo.isWrite ? (
          <input
            className="input-text"
            type="text"
            onChange={this.handleInputChange}
            onKeyPress={this.handleInputEnter}
            value={this.state.inputValue}
            onBlur={this.onBlur}
            autoFocus
          />
        ) : (
          <input
            className="input-text"
            type="text"
            onChange={this.handleInputChange}
            onKeyPress={this.handleInputEnter}
            value={this.state.inputValue}
            onClick={() =>
              this.props.handleTodoInputTextLock(this.props.todo.key)
            }
            onFocus={() =>
              this.props.handleTodoInputTextLock(this.props.todo.key)
            }
            readOnly
          />
        )}
      </li>
    );
  }
}

export default TodoListItem;
