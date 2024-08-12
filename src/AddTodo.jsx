import { useState } from 'react';
import PropTypes from 'prop-types';
import './Style.css';

const AddTodo = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(props.text.name);
  const [editedAge, setEditedAge] = useState(props.text.age);

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleAgeChange = (e) => {
    setEditedAge(e.target.value);
  };

  const handleUpdateClick = () => {
    if (isEditing) {
      props.onUpdate(props.id, editedName, editedAge);
    }
    setIsEditing(!isEditing);
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={handleNameChange}
            className="edit-input"
          />
        ) : (
          props.text.name
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            type="number"
            value={editedAge}
            onChange={handleAgeChange}
            className="edit-input"
          />
        ) : (
          props.text.age
        )}
      </td>
      <td>
        <button className="todo-update-button" onClick={handleUpdateClick}>
          {isEditing ? 'Save' : 'Update'}
        </button>
        <button className="todo-delete-button" onClick={() => props.onSelect(props.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

AddTodo.propTypes = {
  text: PropTypes.string,
  onSelect: PropTypes.func,
  id: PropTypes.number,
  onUpdate:PropTypes.func
}

export default AddTodo;
