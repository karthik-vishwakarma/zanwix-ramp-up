
import axios from 'axios';

const API_URL = '/user.json'; 

export const getUsers = () => axios.get(API_URL);
export const createUser = (user) => {
  return axios.get(API_URL).then(response => {
    const users = response.data;
    const newUser = { ...user, id: users.length + 1 };
    users.push(newUser);
    return { data: newUser };
  });
};
export const updateUser = (id, user) => {
  return axios.get(API_URL).then(response => {
    const users = response.data;
    const index = users.findIndex(u => u.id === id);
    if (index > -1) {
      users[index] = { ...users[index], ...user };
    }
    return { data: users[index] };
  });
};
export const deleteUser = (id) => {
  return axios.get(API_URL).then(response => {
    const users = response.data;
    const filteredUsers = users.filter(user => user.id !== id);
    return { data: filteredUsers };
  });
};
