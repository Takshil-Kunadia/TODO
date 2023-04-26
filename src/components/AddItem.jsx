import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

// Component for displaying to-do card
function AddItemInput({item, editing, setItem, onClickAddHandler, onClickSaveHandler}) {
  
  useEffect(() => {
    if ( editing ) {
      setItem(editing.name)
    }
  },[editing, setItem]);

    if(editing){
        return (
            <div className="edit-item input-container">
              <form className="item-input">
              <input type="text" className="edit-item-input" placeholder="Add Task ;)" value={item} onChange={(e) => setItem(e.target.value)}/>
              <button className="edit-input-button" 
              onClick={(e)=>{
                  e.preventDefault();
                  onClickSaveHandler();
                  }}>
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
              </form>
            </div>
          );
    }

    return (
      <div className="add-item input-container">
        <form className="item-input">
        <input type="text" className="add-item-input" placeholder="Add a New Task" value={item} onChange={(e) => setItem(e.target.value)}/>
        <button className="add-item-button" 
        onClick={(e)=>{
            e.preventDefault();
            onClickAddHandler()
            }}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
        </form>
      </div>
    );
  }
  
export default AddItemInput;
