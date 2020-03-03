import React from "react";
import CategoryList from "./CategoryList";
import TodoList from "./TodoList";
import Search from "./Search";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categorys: JSON.parse(localStorage.getItem("categorys")) || [],
      currentCategory: localStorage.getItem("categorys")
        ? JSON.parse(localStorage.getItem("categorys"))[0].text
        : null,
      todos: JSON.parse(localStorage.getItem("todos")) || [],
      searchValue: ""
    };
  }

  clickCategoryItem = (item, itemKey) => {
    let newCategorys = this.state.categorys;
    newCategorys.map(category => {
      if (category.key === itemKey) {
        return (category.isClick = true);
      } else {
        return (category.isClick = false);
      }
    });

    this.setState({
      currentCategory: item
    });
  };

  addCategoryItem = key => {
    let text = "새목록";
    let newCategory = {
      text: text,
      key: key,
      isClick: true,
      isWrite: false
    };

    let newCategorys = this.state.categorys;
    newCategorys.map(category => {
      return (category.isClick = false);
    });

    this.setState({
      categorys: [...newCategorys, newCategory],
      currentCategory: text
    });
  };

  editCategoryItem = (prevText, changeText, itemId) => {
    let newCategorys = this.state.categorys;

    // 카테고리 리스트중 현재 수정한 아이템과 id가 같은 목록만 매핑해준다
    newCategorys.map(item => {
      if (item.key === itemId) {
        return (item.text = changeText);
      }
    });

    let newTodos = this.state.todos;
    newTodos.map(todo => {
      if (todo.category === prevText) {
        return (todo.category = changeText);
      }
    });

    this.setState({
      categorys: newCategorys,
      currentCategory: changeText,
      todos: newTodos
    });
  };

  categoryInputTextNoLock = categoryKey => {
    let newCategorys = this.state.categorys;
    newCategorys.map(category => {
      if (category.key === categoryKey) {
        category.isWrite = !category.isWrite;
        category.isClick = true;
        return category;
      }
    });
    this.setState({
      categorys: newCategorys
    });
  };

  handleAddTodoBtn = (text, key) => {
    if (!this.state.currentCategory) {
      return;
    }

    let newTodo = {
      category: this.state.currentCategory,
      text: text,
      key: key,
      isChecked: false,
      isWrite: true
    };

    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  };

  editTodoItem = (changeText, todoKey) => {
    let newTodos = this.state.todos;
    newTodos.map(todo => {
      if (todo.key === todoKey) {
        todo.text = changeText;
        todo.isWrite = !todo.isWrite;
        return todo;
      }
    });

    this.setState({
      todos: newTodos
    });
  };

  todoInputTextNoLock = todoKey => {
    let newTodos = this.state.todos;
    newTodos.map(todo => {
      if (todo.key === todoKey) {
        todo.isWrite = true;
      }
    });
    this.setState({
      todos: newTodos
    });
  };

  handleCheckTodoItem = todoKey => {
    let newTodos = this.state.todos;
    newTodos.map(todo => {
      if (todo.key === todoKey) {
        todo.isChecked = !todo.isChecked;
      }
    });

    this.setState({
      todos: newTodos
    });
  };

  searchInputChange = text => {
    this.setState({
      searchValue: text
    });
  };

  render() {
    localStorage.setItem("categorys", JSON.stringify(this.state.categorys));
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
    return (
      <React.Fragment>
        <div className="section left">
          <CategoryList
            categorys={this.state.categorys}
            clickCategoryItem={this.clickCategoryItem}
            addCategoryItem={this.addCategoryItem}
            editCategoryItem={this.editCategoryItem}
            categoryInputTextNoLock={this.categoryInputTextNoLock}
          />
        </div>
        <div className="section right">
          <Search
            searchInputChange={this.searchInputChange}
            searchValue={this.state.searchValue}
          />
          <TodoList
            handleAddTodoBtn={this.handleAddTodoBtn}
            currentCategory={this.state.currentCategory}
            todos={this.state.todos}
            editTodoItem={this.editTodoItem}
            searchValue={this.state.searchValue}
            handleCheckTodoItem={this.handleCheckTodoItem}
            todoInputTextNoLock={this.todoInputTextNoLock}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
