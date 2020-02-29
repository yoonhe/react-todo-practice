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
        <span>
          <input type="checkbox" />
          <label></label>
        </span>
        <input
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
