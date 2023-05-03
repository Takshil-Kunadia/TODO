import "./App.css";
import { useState, useEffect } from "react";
import ToDoList from "./components/ToDoList";
import AddItemInput from "./components/AddItem";
import Filters from "./components/Filters";
import { v4 as uuidv4 } from "uuid";

function App() {
    const [toDoList, setToDoList] = useState(() => {
        let localData = localStorage.getItem("toDoList");
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem("toDoList", JSON.stringify(toDoList));
    }, [toDoList]);

    const [item, setItem] = useState("");
    // stores either boolean or todo object
    const [editing, setEditing] = useState(false);

    const allCompleted = toDoList.every((todo) => {
        return todo.isCompleted === true;
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSorted, setIsSorted] = useState(false);

    const onSearchChangeHandler = (e) => {
        if (e.target.value !== "") {
            const searchQuery = e.target.value.toLowerCase();
            console.log(searchQuery);
            const newToDoList = toDoList.filter((todo) => {
                return todo.name.toLowerCase().includes(searchQuery);
            });
            setSearchResults(newToDoList);
        } else {
            setSearchResults(toDoList);
        }
        setSearchTerm(e.target.value);
    };

    const onClickAddHandler = () => {
        if (item === "") {
            return;
        }
        let itemObj = { id: uuidv4(), name: item, isCompleted: false };
        setToDoList([...toDoList, itemObj]);
        setItem("");
    };

    const onClickEditHandler = (todoObject) => {
        setEditing(todoObject);
    };

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
        console.log(updatedToDoList);
        setToDoList(updatedToDoList);
        setItem("");
        setEditing(false);
    };

    const onClickDeleteHandler = (todoObject) => {
        let updatedToDoList = toDoList.filter((todo) => {
            return todo.id !== todoObject.id;
        });
        setToDoList(updatedToDoList);
        setSearchResults(updatedToDoList);
    };

    const onClickSelectHandler = (todoObject) => {
        let updatedToDoList = toDoList.map((todo) => {
            if (todo.id === todoObject.id) {
                todo.isCompleted = !todo.isCompleted;
            }
            return todo;
        });
        setToDoList(updatedToDoList);
    };

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
                    <div className="todo-status">
                        <span className="todo-status-text">
                            {allCompleted ? "Tasks Completed 🎉" : ""}
                        </span>
                    </div>
                }
                <ToDoList
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
                <AddItemInput
                    item={item}
                    editing={editing}
                    setItem={setItem}
                    onClickAddHandler={onClickAddHandler}
                    onClickSaveHandler={onClickSaveHandler}
                />
            </div>
        </div>
    );
}

export default App;
