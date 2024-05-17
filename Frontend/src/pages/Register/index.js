import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2/dist/sweetalert2.js";
import 'sweetalert2/src/sweetalert2.scss';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState("");
  // const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4060/api/auth/signup", { username, email, password,  roles: roles.length > 0 ? roles : ["user"] });
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
        alert(error.response.data.message);
      }
      console.error("Đăng nhập thất bại:", error);
    }
  };
  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setRoles(prevRoles => [...prevRoles, value]);
    } else {
      setRoles(prevRoles => prevRoles.filter(role => role !== value));
    }
  };

  return (
    <div className="login-page">
      <div className="login">
        <form onSubmit={handleSubmit}>
          <div className="box">
            <div className="container">
              {/* <div className="top-header"> */}
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
              <div style={{color: "#fff"}}>
                <label>
                  <input
                    type="checkbox"
                    value="admin"
                    checked={roles.includes('admin')}
                    onChange={handleRoleChange}
                  />
                  Admin
                </label>
                <label>
                  <input
                    type="checkbox"
                    value="user"
                    checked={roles.includes('user')}
                    onChange={handleRoleChange}
                  />
                  User
                </label>
                {/* Add more roles if needed */}
              </div>
              <div className="input-field">
                <input type="submit" className="submit-login" value="Register" />
              </div>
              <div className="bottom">
                <div className="right">
                  <label><a href="/login">Back to Login</a></label>
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
