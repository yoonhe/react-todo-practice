import React from "react";

class TodoListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: this.props.todo.text,
      isWrite: true
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

  render() {
    return (
      <li>
        <span className="input-checkbox">
          <input id={`item${this.props.index}`} type="checkbox" />
          <label htmlFor={`item${this.props.index}`}></label>
        </span>
        {this.state.isWrite ? (
          <input
            className="input-text"
            type="text"
            onChange={this.handleInputChange}
            onKeyPress={this.handleInputEnter}
            value={this.state.inputValue}
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
