
import React, { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, userToEdit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [buttonLabel, setButtonLabel] = useState('Add User');

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setButtonLabel('Edit User');
    } else {
      setName('');
      setEmail('');
      setButtonLabel('Add User');
    }
  }, [userToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { id: userToEdit ? userToEdit.id : undefined, name, email };
    onSubmit(user);
    setName('');
    setEmail('');
    setButtonLabel('Add User'); 
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">{buttonLabel}</button>
    </form>
  );
};

export default UserForm;
