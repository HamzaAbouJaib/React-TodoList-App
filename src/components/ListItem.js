import React from "react";
import "./listItem.css";

const ListItem = (props) => {
  const index = props.index;
  const todoItem = props.todoItem;

  return (
    <div className="listItem">
      <div className={todoItem.isChecked ? "checked" : ""}>
        <input
          title="todoItemCheckBox"
          className="checkbox"
          name={index}
          type="checkbox"
          checked={todoItem.isChecked}
          onChange={props.handleCheck}
        />
        {todoItem.title}
      </div>
      <div>
        <button name={index} className="editBtn" onClick={props.handleEdit}>
          &#9998;
        </button>
        <button name={index} className="delBtn" onClick={props.handleDel}>
          &#10006;
        </button>
      </div>
    </div>
  );
};

export default ListItem;
