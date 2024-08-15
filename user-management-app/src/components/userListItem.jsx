
import React from 'react';

const UserListItem = ({ user, onEdit, onDelete }) => {
  return (
    <li className="user-list-item">
      <div className="user-data">
        {user.name} ({user.email})
      </div>
      <div className="actions">
        <button className="edit" onClick={() => onEdit(user)}>Edit</button>
        <button className="delete" onClick={() => onDelete(user.id)}>Delete</button>
      </div>
    </li>
  );
};

export default UserListItem;



