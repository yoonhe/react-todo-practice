import React from "react";
import CategoryList from "./CategoryList";
import TodoList from "./TodoList";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categorys: JSON.parse(localStorage.getItem("categorys")) || [],
      currentCategory: "",
      todos: []
    };
  }

  clickCategoryItem = item => {
    this.setState({
      currentCategory: item
    });
  };

  addCategoryItem = (text, key) => {
    let newCategory = {
      text: text,
      key: key
    };
    this.setState({
      categorys: [...this.state.categorys, newCategory],
      currentCategory: text
    });
  };

  editCategoryItem = (changeText, itemId) => {
    console.log("itemid ? ", itemId);
    let newCategorys = this.state.categorys;

    // 카테고리 리스트중 현재 수정한 아이템과 id가 같은 목록만 매핑해준다
    newCategorys.map(item => {
      if (item.key === itemId) {
        item.text = changeText;
      }
    });

    this.setState({
      categorys: newCategorys,
      currentCategory: changeText
    });
  };

  handleAddTodoBtn = (text, key) => {
    if (!this.state.currentCategory) {
      return;
    }

    let newTodo = {
      category: this.state.currentCategory,
      text: text,
      key: key
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
      }
    });

    this.setState({
      todos: newTodos
    });
  };

  render() {
    localStorage.setItem("categorys", JSON.stringify(this.state.categorys));
    console.log("todos ? ", this.state.todos);
    console.log("currentCategory ? ", this.state.currentCategory);
    return (
      <React.Fragment>
        <div className="section left">
          <CategoryList
            categorys={this.state.categorys}
            clickCategoryItem={this.clickCategoryItem}
            addCategoryItem={this.addCategoryItem}
            editCategoryItem={this.editCategoryItem}
          />
        </div>
        <div className="section right">
          <TodoList
            handleAddTodoBtn={this.handleAddTodoBtn}
            currentCategory={this.state.currentCategory}
            todos={this.state.todos}
            editTodoItem={this.editTodoItem}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
