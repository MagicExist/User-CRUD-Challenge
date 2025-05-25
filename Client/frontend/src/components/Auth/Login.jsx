import { useState } from 'react';
import '../../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (email === 'usuario@ejemplo.com' && password === '123456') {
      setIsLoggedIn(true);
    } else {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  if (isLoggedIn) {
    return (
      <div className="app-container">
        <div className="login-container">
          <h2>Welcome home</h2>
          <p>You have successfully logged in.</p>
          <div className="status-bar">
            <span>Remote In 50 days</span>
            <span>Programmer</span>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="login-wrapper">
        <div className="login-container">
          <h2>Welcome</h2>
          <p>Please enter your details.</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          
          <div className="status-bar">
            <span>Forgot password?</span>
          </div>
        </div>
        
        <div className="decoration-container">
          <div className="decoration-content">
            <h3>Register</h3>
            <p>Don't have an account?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;