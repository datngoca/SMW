// components/Login.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../AuthContext";

function Login() {
  
  const navigate = useNavigate();
  // const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '123') {
      sessionStorage.setItem('isAuthenticated', 'true');
      // login();
      
      navigate("/");
      alert('Đăng nhập thành công!');
    } else {
      alert('Thông tin đăng nhập không đúng');
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
