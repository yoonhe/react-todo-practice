import React from "react";
import CategoryListItem from "./CategoryListItem";

const CategoryList = ({
  categorys,
  clickCategoryItem,
  addCategoryItem,
  editCategoryItem
}) => (
  <div className="category-wrap">
    <p className="btn-box">
      <button
        className="btn-add-cate"
        onClick={addCategoryItem.bind(null, "새목록", Date.now())}
      >
        카테고리 추가하기
      </button>
    </p>
    <ul className="cate-list">
      {categorys.map((item, index) => (
        <CategoryListItem
          item={item}
          key={index}
          itemId={item["key"]}
          editCategoryItem={editCategoryItem}
          clickCategoryItem={clickCategoryItem}
        />
      ))}
    </ul>
  </div>
);

export default CategoryList;
