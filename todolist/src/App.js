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
        : "",
      todos: JSON.parse(localStorage.getItem("todos")) || [],
      searchValue: ""
    };
  }

  componentDidMount() {
    let newCategorys = this.state.categorys;
    newCategorys.map((category, index) => {
      if (index === 0) {
        category.isClick = true;
      } else {
        category.isClick = false;
      }
    });

    this.setState({
      categorys: newCategorys
    });
  }

  clickCategoryItem = (itemText, itemKey) => {
    let newCategorys = this.state.categorys;

    // 카테고리 리스트중 현재 내가 클릭한 카테고리의 키값과 같은 카테고리의 isClick만 true로 바꿔주고 같지 않은 카테고리의 isClick은 false로 바꿔준다
    // 클릭시 클릭이 되었다는 것을 보여주기위함
    newCategorys.map(category => {
      if (category.key === itemKey) {
        return (category.isClick = true);
      } else {
        return (category.isClick = false);
      }
    });

    this.setState({
      currentCategory: itemText
    });
  };

  addCategoryItem = key => {
    let text = "새목록";
    let newCategory = {
      text: text,
      key: key,
      isClick: true,
      isWrite: true
    };

    let newCategorys = this.state.categorys;
    newCategorys.map(category => {
      category.isClick = false;
      return category;
    });
    // 새로 추가되는 카테고리의 isClick만 true가 되어야하기 때문에 나머지 카테고리의 isClick은 false로 바꿔준다

    this.setState({
      categorys: [...newCategorys, newCategory],
      currentCategory: text // todoList의 타이틀에 currentCategory값을 넣어주기 위해
    });
  };

  editCategoryItem = (prevText, changeText, itemId) => {
    let newCategorys = this.state.categorys;

    // 카테고리 리스트중 현재 수정한 아이템과 id가 같은 카테고리만 매핑해준다
    newCategorys.map(item => {
      if (item.key === itemId) {
        item.text = changeText;
        return item;
      }
    });

    let newTodos = this.state.todos;
    newTodos.map(todo => {
      if (todo.category === prevText) {
        todo.category = changeText;
        return todo;
      }
    });

    this.setState({
      categorys: newCategorys,
      currentCategory: changeText,
      todos: newTodos
    });
  };

  handleCategoryInputLock = categoryKey => {
    // input의 초기값은 false => click시 true => true상태에서 포커스아웃시 false로 바뀌게됨
    // input이 클릭되거나 클릭된 상태에서 포커스아웃될때 input의 잠금상태를 관리해줌
    let newCategorys = this.state.categorys;
    newCategorys.map(category => {
      if (category.key === categoryKey) {
        category.isWrite = !category.isWrite;
        return category;
      }
    });

    this.setState({
      categorys: newCategorys
    });
  };

  // 모든 함수명 앞에 handle을 붙여주는게 좋은건가??
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

  editTodoItemAndInputLock = (changeText, currentTodoKey) => {
    let newTodos = this.state.todos;
    newTodos.map(todo => {
      if (todo.key === currentTodoKey) {
        todo.text = changeText;
        todo.isWrite = false;
        // 텍스트 수정이 끝난후 input을 비활성화 시키기위해
        return todo;
      }
    });

    this.setState({
      todos: newTodos
    });
  };

  handleTodoInputTextLock = todoKey => {
    let newTodos = this.state.todos;
    newTodos.map(todo => {
      if (todo.key === todoKey) {
        todo.isWrite = true;
        // input이 비활성화 상태일때 활성화상태로 바꿔줌
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

  searchInputChange = searchText => {
    this.setState({
      searchValue: searchText
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
            handleCategoryInputLock={this.handleCategoryInputLock}
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
            editTodoItemAndInputLock={this.editTodoItemAndInputLock}
            searchValue={this.state.searchValue}
            handleCheckTodoItem={this.handleCheckTodoItem}
            handleTodoInputTextLock={this.handleTodoInputTextLock}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
