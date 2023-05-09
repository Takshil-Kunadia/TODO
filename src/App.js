import "./App.css";
import { useState, useEffect } from "react";
import ToDoList from "./components/ToDoList";
import AddItemInput from "./components/AddItem";
import Filters from "./components/Filters";
import { v4 as uuidv4 } from "uuid";

function App() {
    /**
     * toDoList is an array of todo objects
     */
    const [toDoList, setToDoList] = useState(() => {
        let localData = localStorage.getItem("toDoList");
        return localData ? JSON.parse(localData) : [];
    });

    /**
     * useEffect is used to store the toDoList in localStorage
     */
    useEffect(() => {
        localStorage.setItem("toDoList", JSON.stringify(toDoList));
    }, [toDoList]);

    /**
     * item is a string which stores the value of the input field
     */
    const [item, setItem] = useState("");

    /**
     * editing is a boolean which is used to check if the user is editing an item or not
     */
    const [editing, setEditing] = useState(false);

    /**
     * allCompleted is a boolean which is used to check if all the tasks are completed or not
     */
    const allCompleted = toDoList.every((todo) => {
        return todo.isCompleted === true;
    });

    /**
     * searchTerm is a string which stores the value of the search input field
     */
    const [searchTerm, setSearchTerm] = useState("");

    /**
     * searchResults is an array of todo objects which stores the filtered todo list
     */
    const [searchResults, setSearchResults] = useState([]);

    /**
     * isSorted is a boolean which is used to check if the list is sorted or not
     */
    const [isSorted, setIsSorted] = useState(false);

    /**
     * Handles the search functionality.
     * Based on the search query, it filters the todo list and stores it in searchResults.
     * If the search query is empty then it stores the original todo list in searchResults.
     */
    const onSearchChangeHandler = (e) => {
        if (e.target.value !== "") {
            const searchQuery = e.target.value.toLowerCase();
            const newToDoList = toDoList.filter((todo) => {
                return todo.name.toLowerCase().includes(searchQuery);
            });
            setSearchResults(newToDoList);
        } else {
            setSearchResults(toDoList);
        }
        setSearchTerm(e.target.value);
    };

    /**
     * onClickAddHandler is used to add a new item to the todo list
     * It checks if the item is empty or not
     * If the item is empty then it returns
     * Else it creates a new todo object and adds it to the todo list
     * It also resets the input field
     */
    const onClickAddHandler = () => {
        if (item === "") {
            return;
        }
        let itemObj = { id: uuidv4(), name: item, isCompleted: false };
        setToDoList([...toDoList, itemObj]);
        setItem("");
    };

    /**
     * onClickEditHandler is used to edit an item from the todo list
     * It sets the item value to the input field
     * It also sets the editing value to the todo object which is being edited
     */
    const onClickEditHandler = (todoObject) => {
        setItem(todoObject.name);
        setEditing(todoObject);
    };

    /**
     * onClickSaveHandler is used to save the edited item
     * It checks if the item is empty or not
     * If the item is empty then it returns
     * Else it updates the todo list with the edited item
     * It also resets the input field and editing value
     */
    const onClickSaveHandler = () => {
        if (item === "") {
            return;
        }
        let updatedToDoList = toDoList.map((todo) => {
            if (todo.id === editing.id) {
                todo.name = item;
            }
            return todo;
        });
        setToDoList(updatedToDoList);
        setItem("");
        setEditing(false);
    };

    /**
     * onClickDeleteHandler is used to delete an item from the todo list
     * It removes the todo object from the todo list
     * It also updates the searchResults
     */
    const onClickDeleteHandler = (todoObject) => {
        toDoList.splice(toDoList.indexOf(todoObject), 1);
        setToDoList([...toDoList]);
        setSearchResults([...toDoList]);
    };

    /**
     * onClickSelectHandler is used to mark an item as completed or not completed
     * It updates the todo list with the updated todo object
     */
    const onClickSelectHandler = (todoObject) => {
        let updatedToDoList = toDoList.map((todo) => {
            if (todo.id === todoObject.id) {
                todo.isCompleted = !todo.isCompleted;
            }
            return todo;
        });
        setToDoList(updatedToDoList);
    };

    /**
     * It updates the isSorted value
     */
    const onClickSortHandler = () => {
        setIsSorted(!isSorted);
    };

    return (
        <div className="App">
            <div className="app-container">
                <header className="app-header">
                    <h1 className="app-title">RT TODO APP</h1>
                </header>
                <Filters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearchChangeHandler={onSearchChangeHandler}
                    onClickSortHandler={onClickSortHandler}
                    isSorted={isSorted}
                />
                {
                    // if allCompleted is true then display message
                    <div className="todo-status">
                        <span className="todo-status-text">
                            {allCompleted ? "Tasks Completed 🎉" : ""}
                        </span>
                    </div>
                }
                <ToDoList
                    item={item}
                    toDoList={toDoList}
                    searchTerm={searchTerm}
                    searchResults={searchResults}
                    setItem={setItem}
                    setToDoList={setToDoList}
                    editing={editing}
                    setEditing={setEditing}
                    isSorted={isSorted}
                    onClickEditHandler={onClickEditHandler}
                    onClickDeleteHandler={onClickDeleteHandler}
                    onClickSelectHandler={onClickSelectHandler}
                    onClickSaveHandler={onClickSaveHandler}
                />
                {editing ? ( // if editing is true then disable add Item and display message
                    <span className="editing-item-status">
                        Please save the current item before adding new Item...
                    </span>
                ) : (
                    // else display input field
                    <AddItemInput
                        item={item}
                        setItem={setItem}
                        onClickAddHandler={onClickAddHandler}
                        onClickSaveHandler={onClickSaveHandler}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
