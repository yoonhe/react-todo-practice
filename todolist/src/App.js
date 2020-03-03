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
      searchValue: null
    };
  }

  clickCategoryItem = item => {
    this.setState({
      currentCategory: item
    });
  };

  addCategoryItem = key => {
    let text = "새목록";
    let count = 1;

    this.state.categorys.forEach(category => {
      category.text === `${text}${count}` && count++;
    });

    text = `${text}${count}`;

    let newCategory = {
      text: text,
      key: key,
      isClick: false,
      isWrite: false
    };

    this.setState({
      categorys: [...this.state.categorys, newCategory],
      currentCategory: text
    });
  };

  editCategoryItem = (prevText, changeText, itemId) => {
    let newCategorys = this.state.categorys;

    // 카테고리 리스트중 현재 수정한 아이템과 id가 같은 목록만 매핑해준다
    newCategorys.map(item => {
      if (item.key === itemId) {
        item.text = changeText;
      }
    });

    let newTodos = this.state.todos;
    newTodos.map(todo => {
      if (todo.category === prevText) {
        todo.category = changeText;
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
      console.log("categoryKey ? ", categoryKey);
      // console.log("category.isWrite ? ", category.isWrite);
      if (category.key === categoryKey) {
        console.log("같음");
        category.isWrite = !category.isWrite;
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
    console.log("categorys", this.state.categorys);
    localStorage.setItem("categorys", JSON.stringify(this.state.categorys));
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
    return (
      <React.Fragment>
        <div className="section left">
          <CategoryList
            categorys={this.state.categorys}
            currentCategory={this.state.currentCategory}
            clickCategoryItem={this.clickCategoryItem}
            addCategoryItem={this.addCategoryItem}
            editCategoryItem={this.editCategoryItem}
            categoryInputTextNoLock={this.categoryInputTextNoLock}
          />
        </div>
        <div className="section right">
          <Search searchInputChange={this.searchInputChange} />
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
