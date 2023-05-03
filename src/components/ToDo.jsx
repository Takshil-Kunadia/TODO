import EditSVG from '../assets/edit-pencil.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

function ToDoItem({todo, setItem, editing, setEditing, onClickEditHandler, onClickDeleteHandler, onClickSelectHandler, onClickSaveHandler}) {

  let inputContainer;
  if(editing && editing.id === todo.id){
    inputContainer = (
        <div className="edit-item input-container">
          <form className="item-input">
          <input type="text" className="edit-item-input" placeholder="Edit Task ;)" defaultValue={todo.name} onChange={(e) => {e.stopPropagation(); setItem(e.target.value)}}/>
          <button className="edit-input-button"
          onClick={(e)=>{
              e.preventDefault();
              e.stopPropagation();
              onClickSaveHandler();
              }
          }>
                <FontAwesomeIcon icon={faCheck} />
              </button>
          </form>
        </div>
      );
  } else {
    inputContainer = (
    <span onClick={(e) => {onClickSelectHandler(todo)}}>{todo.name}</span>
  );
  }

    return (
      <div className={"to-do-item" + (todo.isCompleted ? " todo-completed" : "")}>
        <input type="checkbox" checked={todo.isCompleted} onChange={(e) => {e.stopPropagation(); onClickSelectHandler(todo)}}/>
        {inputContainer}
        <div className="buttons">
        <button className="edit-item-button" onClick={(e) => {e.stopPropagation(); onClickEditHandler(todo)}}>
          <img src={EditSVG} alt="Edit" />
        </button>
        <button className="delete-item-button" onClick={(e) => {e.stopPropagation(); onClickDeleteHandler(todo)}}>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="48" height="48" viewBox="0 0 48 48">
            <polygon fill="#f5bc00" points="29,5 29,2 19,2 19,5 9,5 9,11 39,11 39,5"></polygon><polygon fill="#8FE3CF" points="8.291,11 11.3,42 36.7,42 39.709,11"></polygon><rect width="36" height="6" x="6" y="8" fill="#3dd9eb"></rect><rect width="30" height="3" x="9" y="8" fill="#00b3d7"></rect>
          </svg>
        </button>
        </div>
      </div>
    );
  }
  
export default ToDoItem;
