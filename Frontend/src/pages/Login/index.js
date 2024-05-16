import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4060/api/auth/signin", { email, password });
      localStorage.setItem("tokens", response.data.token);
      sessionStorage.setItem('isAuthenticated', 'true');
      //login();
      navigate("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
      console.error("Đăng nhập thất bại:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login ">
        <form onSubmit={handleSubmit}>
          <div className="box">
            <div className="container">
              <div className="top-header">
              </div>
              <div className="input-field">
                <input
                  className="input"
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                
                <i className="bx bx-user"></i>
              </div>
              <div className="input-field">
                
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
               
                <i className="bx bx-lock-alt"></i>
              </div>
              <div className="input-field">
                <input type="submit" className="submit-login" value="Login" />
              </div>
              <div className="bottom">
                <div className="right">
                  <label><a href="/register">Already have an account?</a></label>
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>

  );
}

export default Login;