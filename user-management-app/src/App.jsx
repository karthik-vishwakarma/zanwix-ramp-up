import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserForm from './components/userForm';
import UserList from './components/userList';
import LoginPage from './components/loginPage';
import SignupPage from './components/signupPage';
import { getUsers, createUser, updateUser, deleteUser } from './api';
import './index.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users on component mount
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
  }, []); // Empty dependency array ensures this runs only on mount

  // Handle creating or updating a user
  const handleCreateUser = async (user) => {
    try {
      if (user.id) {
        // Update existing user
        const response = await updateUser(user.id, user);
        setUsers(prevUsers => prevUsers.map(u => (u.id === user.id ? response.data : u)));
        setEditingUser(null); // Reset editing user
      } else {
        // Create new user
        const response = await createUser(user);
        setUsers(prevUsers => {
          // Avoid adding duplicate users
          if (prevUsers.some(u => u.id === response.data.id)) {
            return prevUsers;
          }
          return [...prevUsers, response.data];
        });
      }
    } catch (err) {
      setError('Failed to save user');
    }
  };

  // Set the user to be edited
  const handleUpdateUser = (user) => {
    setEditingUser(user);
  };

  // Handle deleting a user
  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  // Login handler placeholder
  const handleLogin = (email, password) => {
    // Handle login logic
  };

  return (
    <Router>
      <div className="box">
        <h1>User Management App</h1>
        <Routes>
          <Route path="/" element={<LoginPage registeredUsers={users} />} />
          <Route path="/signup" element={<SignupPage onSubmit={handleCreateUser} />} />
          <Route
            path="/dashboard"
            element={
              <>
                {error && <p className="error">{error}</p>}
                <UserForm onSubmit={handleCreateUser} userToEdit={editingUser} />
                <UserList users={users} onEdit={handleUpdateUser} onDelete={handleDeleteUser} />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
