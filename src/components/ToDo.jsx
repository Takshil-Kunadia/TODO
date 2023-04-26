import EditSVG from '../assets/edit-pencil.svg';

function ToDoItem({todo, onClickEditHandler, onClickDeleteHandler, onClickSelectHandler}) {
    return (
      <div className={"to-do-item" + (todo.isCompleted ? " todo-completed" : "")}>
        <input type="checkbox" checked={todo.isCompleted} onChange={(e) => {onClickSelectHandler(todo)}}/>
        <span>{todo.name}</span>
        <div className="buttons">
        <button className="edit-item-button" onClick={(e) => {onClickEditHandler(todo)}}>
          <img src={EditSVG} alt="Edit" />
        </button>
        <button className="delete-item-button" onClick={(e) => {onClickDeleteHandler(todo)}}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
            <polygon fill="#f5bc00" points="29,5 29,2 19,2 19,5 9,5 9,11 39,11 39,5"></polygon><polygon fill="#8FE3CF" points="8.291,11 11.3,42 36.7,42 39.709,11"></polygon><rect width="36" height="6" x="6" y="8" fill="#3dd9eb"></rect><rect width="30" height="3" x="9" y="8" fill="#00b3d7"></rect>
          </svg>
        </button>
        </div>
      </div>
    );
  }
  
export default ToDoItem;
