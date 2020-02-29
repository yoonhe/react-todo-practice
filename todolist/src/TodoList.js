import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({
  handleAddTodoBtn,
  currentCategory,
  todos,
  editTodoItem
}) => (
  <div className="todo-list-box">
    <h2>{currentCategory}</h2>
    <ul className="todo-list">
      {todos.map((todo, idx) =>
        todo.category === currentCategory ? (
          <TodoListItem key={idx} todo={todo} editTodoItem={editTodoItem} />
        ) : null
      )}
    </ul>
    <button
      className="btn-add-todo"
      onClick={handleAddTodoBtn.bind(null, "", Date.now())}
    >
      새 할일 추가
    </button>
  </div>
);

export default TodoList;
