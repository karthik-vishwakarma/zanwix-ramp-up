import React from 'react';
import UserListItem from './userListItem';

const UserList = ({ users, onEdit, onDelete }) => {
  // console.log(users);
  return (
    <ul>
      {users.map(user => (
        <UserListItem
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default UserList;
