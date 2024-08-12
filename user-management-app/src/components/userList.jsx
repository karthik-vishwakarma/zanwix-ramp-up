
import { useState } from 'react';
import UserForm from './userForm';

const UserList = ({ users, onEdit, onDelete }) => {
  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <div >
      {editingUser ? (
        <UserForm user={editingUser} onSubmit={onEdit} onCancel={handleCancel} />
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} ({user.email})
              <div className="button-container">
                <button className='btn-edit' onClick={() => handleEdit(user)}>Edit</button>
                <button className='btn-delete' onClick={() => handleDelete(user.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
