import "./App.css";
import { useState, useEffect } from "react";
import ToDoList from "./components/ToDoList";
import AddItemInput from "./components/AddItem";
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

    return (
        <div className="App">
            <div className="app-container">
                <header className="app-header">
                    <h1 className="app-title">RT TODO APP</h1>
                </header>
                {
                    <div className="todo-status">
                        <span className="todo-status-text">
                            {allCompleted ? "Tasks Completed 🎉" : ""}
                        </span>
                    </div>
                }
                <ToDoList
                    toDoList={toDoList}
                    setToDoList={setToDoList}
                    onClickEditHandler={onClickEditHandler}
                    onClickDeleteHandler={onClickDeleteHandler}
                    onClickSelectHandler={onClickSelectHandler}
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
