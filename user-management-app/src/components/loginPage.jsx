import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ registeredUsers }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Debugging logs
    console.log('Registered Users:', registeredUsers);
    console.log('Entered Email:', email);
    console.log('Entered Password:', password);

    // Check if the user is registered
    const user = registeredUsers.find(user => user.email === email);

    if (user) {
      if (user.password === password) {
        // Navigate to the dashboard if login is successful
        navigate('/dashboard');
      } else {
        setError('Invalid password');
      }
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
