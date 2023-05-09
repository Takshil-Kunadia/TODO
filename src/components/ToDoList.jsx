import ToDoItem from './ToDo';

/**
 * ToDoList component is used to display the list of to-do items.
 * If the search term is not empty, then the search results are displayed.
 * If the search term is empty, then the entire list is displayed.
 */
function ToDoList({item, setItem, searchTerm, toDoList, isSorted, searchResults, setToDoList, editing, setEditing, onClickEditHandler, onClickDeleteHandler, onClickSelectHandler, onClickSaveHandler}) {
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
                return <ToDoItem item={item} key={todo.id} todo={todo} setItem={setItem} editing={editing} setEditing={setEditing} onClickEditHandler={onClickEditHandler} onClickDeleteHandler={onClickDeleteHandler} onClickSelectHandler={onClickSelectHandler} onClickSaveHandler={onClickSaveHandler} />
            }
            )
        }
      </div>
    );
  }
  

export default ToDoList;
