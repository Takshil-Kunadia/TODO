import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// Component for displaying to-do card
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
