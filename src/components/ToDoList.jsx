import ToDoItem from './ToDo';
  
function ToDoList({setItem, searchTerm, toDoList, isSorted, searchResults, setToDoList, editing, setEditing, onClickEditHandler, onClickDeleteHandler, onClickSelectHandler, onClickSaveHandler}) {
    let displayList = [...toDoList];
    if (searchTerm.length > 0) {
        displayList = [...searchResults];
        if (isSorted) {
            displayList.sort((a, b) => a.isCompleted - b.isCompleted);
          }
        }
    else {
        if (isSorted) {
          displayList.sort((a, b) => a.isCompleted - b.isCompleted);
        }
    }
    return (
      <div className="to-do-list">
        {
            displayList.map((todo) => {
                return <ToDoItem key={todo.id} todo={todo} setItem={setItem} editing={editing} setEditing={setEditing} onClickEditHandler={onClickEditHandler} onClickDeleteHandler={onClickDeleteHandler} onClickSelectHandler={onClickSelectHandler} onClickSaveHandler={onClickSaveHandler} />
            }
            )
        }
      </div>
    );
  }
  

export default ToDoList;
