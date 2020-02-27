import React from "react";
import CategoryList from "./CategoryList";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categorys: []
    };
  }

  createCategoryItem = (text, key) => {
    let newCategoryItem = {
      text: text,
      key: key
    };

    return newCategoryItem;
  };

  addCategoryItem = (text, key) => {
    this.setState({
      categorys: [...this.state.categorys, this.createCategoryItem(text, key)]
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
      categorys: newCategorys
    });
  };

  render() {
    console.log("categorys ? ", this.state.categorys);
    return (
      <React.Fragment>
        <div className="section left">
          <CategoryList
            categorys={this.state.categorys}
            addCategoryItem={this.addCategoryItem}
            editCategoryItem={this.editCategoryItem}
          />
        </div>
        <div className="section right"></div>
      </React.Fragment>
    );
  }
}

export default App;
