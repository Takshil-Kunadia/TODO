import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

/**
 * AddItemInput component is used to add new item in the list
 * If the input field is not empty, then the new item is added to the list.
 */
function AddItemInput({item, editing, setItem, onClickAddHandler}) {
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
