import axios from 'axios';

const API_URL = '/user.json';
const LOCAL_STORAGE_KEY = 'users';

// Utility function to get users from local storage
const getUsersFromLocalStorage = () => {
  const users = localStorage.getItem(LOCAL_STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

// Utility function to save users to local storage
const saveUsersToLocalStorage = (users) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
};

// Fetch users
export const getUsers = async () => {
  try {
    // Fetch static JSON data
    const response = await axios.get(API_URL);
    const jsonData = response.data;

    // Combine with local storage data
    const localStorageUsers = getUsersFromLocalStorage();

    // Create a map to ensure uniqueness based on ID
    const allUsers = new Map();

    jsonData.forEach(user => allUsers.set(user.id, user));
    localStorageUsers.forEach(user => allUsers.set(user.id, user));

    // Convert map values to an array
    return { data: Array.from(allUsers.values()) };
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

// Create a new user
export const createUser = async (user) => {
  try {
    const { data: users } = await getUsers();
    // Ensure unique ID
    const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
    const newUser = { ...user, id: maxId + 1 };
    users.push(newUser);
    saveUsersToLocalStorage(users);
    return { data: newUser };
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
};

// Update an existing user
export const updateUser = async (id, updatedUser) => {
  try {
    const { data: users } = await getUsers();
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
      throw new Error('User not found');
    }

    users[index] = { ...users[index], ...updatedUser };
    saveUsersToLocalStorage(users);
    return { data: users[index] };
  } catch (error) {
    console.error('Failed to update user:', error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id) => {
  try {
    const { data: users } = await getUsers();
    const filteredUsers = users.filter(user => user.id !== id);
    saveUsersToLocalStorage(filteredUsers);
    return { data: filteredUsers };
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw error;
  }
};
