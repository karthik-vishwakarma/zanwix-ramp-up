
import { useState, useEffect } from 'react';
import UserForm from './components/userForm';
import UserList from './components/userList';
import { getUsers, createUser, updateUser, deleteUser } from './api';

const App = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUser = async (user) => {
    try {
      const response = await createUser(user);
      setUsers([...users, response.data]);
    } catch (err) {
      setError('Failed to create user');
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await updateUser(updatedUser.id, updatedUser);
      setUsers(users.map(user => (user.id === updatedUser.id ? response.data : user)));
    } catch (err) {
      setError('Failed to update user');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className='box'>
      <h1>CRUD Application</h1>
      {error && <p>{error}</p>}
      <UserForm onSubmit={handleCreateUser} />
      <UserList users={users} onEdit={handleUpdateUser} onDelete={handleDeleteUser} />
      
    </div>
  );
};

export default App;
