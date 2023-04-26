import ToDoItem from './ToDo';

function ToDoList({toDoList, setToDoList, onClickEditHandler, onClickDeleteHandler, onClickSelectHandler}) {
    return (
      <div className="to-do-list">
       {
            toDoList.map((todo) => {
                return <ToDoItem key={todo.id} todo={todo} onClickEditHandler={onClickEditHandler} onClickDeleteHandler={onClickDeleteHandler} onClickSelectHandler={onClickSelectHandler} />
            }
            )
       }
      </div>
    );
  }
  
export default ToDoList;
