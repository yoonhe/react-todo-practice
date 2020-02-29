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
      this.props.editTodoItem(this.state.inputValue, this.props.todo.key);
    }
  };

  render() {
    return (
      <li>
        <span className="input-checkbox">
          <input id={`item${this.props.index}`} type="checkbox" />
          <label for={`item${this.props.index}`}></label>
        </span>
        <input
          className="input-text"
          type="text"
          onChange={this.handleInputChange}
          onKeyPress={this.handleInputEnter}
          value={this.state.inputValue}
        />
      </li>
    );
  }
}

export default TodoListItem;
