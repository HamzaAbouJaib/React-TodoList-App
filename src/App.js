import { useState, useRef } from "react";
import ListItem from "./components/ListItem";
import "./App.css";

let isEditMode = false;
let selectedIndex;

export default function App() {
  const [todoItem, setTodoItem] = useState({ title: "", isChecked: false });
  const [todoItems, setTodoItems] = useState(getData());
  window.localStorage.setItem("TodoList", JSON.stringify(todoItems));

  const ref = useRef(null);

  /**
   * It returns an array of todo items from local storage. returns an empty array if no items are in local storage.
   * @returns An array of objects.
   */
  function getData() {
    if (JSON.parse(window.localStorage.getItem("TodoList")) == null) {
      return [];
    }

    return [...JSON.parse(window.localStorage.getItem("TodoList"))];
  }

  /**
   * When the input changes, set the title of the todo item to the value of the input.
   * @param e - the event object
   */
  function handleChange(e) {
    setTodoItem((prev) => {
      return { title: e.target.value, isChecked: prev.isChecked };
    });
  }

  /**
   * The function takes in an event object, and then filters out the todo item that was clicked on from
   * the todoItems array.
   * @param e - the event object
   */
  function handleDel(e) {
    const index = e.target.name;
    const newTodoItems = todoItems.filter((todoItem) => {
      return todoItems.indexOf(todoItem) !== Number(index);
    });
    setTodoItems(newTodoItems);
  }

  /**
   * When the edit button is clicked, the selected index is set to the index of the todo item that was
   * clicked, the selected todo item is set to the todo item that was clicked, and the isEditMode is
   * set to true.
   * This is used to populate the input field with the current value of the todo item selected.
   * @param e - The event object
   */
  function handleEdit(e) {
    selectedIndex = e.target.name;
    const selectedTodo = todoItems[selectedIndex];
    setTodoItem((prev) => {
      return { title: selectedTodo.title, isChecked: selectedTodo.isChecked };
    });
    isEditMode = true;
  }

  /**
   * When the user clicks the submit button, the todo item at the selected index is replaced with the
   * new todo item
   * @param e - The event object
   */
  function handleEditSubmit(e) {
    const newTodoItems = todoItems;
    newTodoItems[selectedIndex] = {
      title: todoItem.title,
      isChecked: todoItem.isChecked,
    };
    setTodoItems(newTodoItems);
    e.preventDefault();
    setTodoItem({ title: "", isChecked: false });
    isEditMode = false;
  }

  /**
   * If the item is checked, then uncheck it. If the item is unchecked, then check it
   * @param e - the event object
   */
  function handleCheck(e) {
    const index = e.target.name;
    const newTodoItems = todoItems;
    if (newTodoItems[index].isChecked) {
      newTodoItems[index].isChecked = false;
    } else {
      newTodoItems[index].isChecked = true;
    }
    setTodoItems(newTodoItems);
    //this is used to force an update so that the checkbox is updated.
    setTodoItem({ title: "", isChecked: false });
  }

  /**
   * When the user clicks the button, the todoItem is added to the todoItems array, the todoItem is
   * reset to an empty object, and the focus is returned to the input field
   * @param e - the event object
   */
  function handleClick(e) {
    setTodoItems([todoItem, ...todoItems]);
    e.preventDefault();
    setTodoItem({ title: "", isChecked: false });
    e.target.focus();
  }

  /**
   * If the user presses the enter key and the input field is focused, then either the edit or add
   * function will be called depending on whether the user is in edit mode or not
   * @param e - the event object
   */
  function handleKeyDown(e) {
    if (e.key === "Enter" && e.target.title === "todoListInput") {
      isEditMode ? handleEditSubmit(e) : handleClick(e);
    }
  }

  /**
   * If the list of todo items is greater than 5, and the list is scrollable, then display the "Scroll
   * Down" message
   * @returns A function that returns a JSX element.
   */
  function handleOverflow() {
    const list = document.getElementById("listItems");

    if (list != null && todoItems.length > 5) {
      if (list.scrollHeight > list.clientHeight) {
        return <h3 className="scroll">Scroll Down</h3>;
      }
    }
  }

  return (
    <div className="container">
      <h3 className="title">TodoList App</h3>
      <div className="todoContainer">
        <input
          title="todoListInput"
          value={todoItem.title}
          autoFocus
          ref={(input) => input && input.focus()}
          type="text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="submit"
          type="submit"
          onClick={isEditMode ? handleEditSubmit : handleClick}
        >
          Add
        </button>
        {todoItems.length !== 0 ? (
          <div id="listItems" className="listItems" ref={ref}>
            {todoItems.map((todoItem, index) => (
              <ListItem
                key={index}
                index={index}
                todoItem={todoItem}
                handleCheck={handleCheck}
                handleEdit={handleEdit}
                handleDel={handleDel}
              />
            ))}
          </div>
        ) : (
          <h3 className="empty-list">Add a Todo to your list</h3>
        )}
        {handleOverflow()}
      </div>
    </div>
  );
}
