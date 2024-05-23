// components/Login.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import 'sweetalert2/src/sweetalert2.scss';
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
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Đăng nhập thành công",
          showConfirmButton: false,
          timer: 3000,
        });
        localStorage.setItem("tokens", response.data.token);
        sessionStorage.setItem('isAuthenticated', 'true');
        //login();
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      }
      console.error("Đăng nhập thất bại:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login">
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
                  <label>
                    <p style={{ display: "inline", whiteSpace: "nowrap" }}>
                      Don't have an account?
                      <a style={{ color: "white", fontWeight: "bold", textDecoration: "underline" }} href="/register">
                        Register
                      </a>
                    </p>
                  </label>
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
