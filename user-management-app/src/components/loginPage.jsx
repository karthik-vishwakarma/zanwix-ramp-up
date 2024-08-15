import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ registeredUsers }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the user is registered
    const user = registeredUsers.find(user => user.email === email);
    
    if (user) {
      // For simplicity, checking password is not implemented
      //password validation here
      navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </form>
    </div>
  );
};

export default LoginPage;
