import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import 'sweetalert2/src/sweetalert2.scss';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== rePassword) {
        Swal.fire({
          icon: "error",
          title: "Mật khẩu không khớp",
          showConfirmButton: false,
          timer: 3000,
        });
        setPassword("");
        setRePassword("");
        return;
      }
      const response = await axios.post("http://localhost:4060/api/auth/signup", { username, email, password, roles: ["admin"] });
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Đăng kí thành công",
          showConfirmButton: false,
          timer: 3000,
        });
        navigate("/login");
      }

    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
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
              <div className="input-field">
                <input
                  className="input"
                  placeholder="Username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <i className="bx bx-user"></i>
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
                <input
                  type="password"
                  className="input"
                  placeholder="rePassword"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  required
                />
                <i className="bx bx-lock-alt"></i>
              </div>
              <div className="input-field">
                <input type="submit" className="submit-login" value="Register" />
              </div>
              <div className="bottom">
                <div className="right">
                  <label>
                    <p style={{ display: "inline", whiteSpace: "nowrap" }}>
                      Already have an account?
                      <a style={{ color: "white", fontWeight: "bold", textDecoration: "underline" }} href="/login">
                        Login
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

export default Register;
