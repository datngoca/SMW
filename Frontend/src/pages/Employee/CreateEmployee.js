import React, { useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import 'sweetalert2/src/sweetalert2.scss';
import Modal from "react-modal";
// import { createResource } from "../../services/services";
import axios from 'axios';
function CreateEmployee(props) {
  const [rePassword, setRePassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { onReload } = props;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roles: "user",
  });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password!== rePassword){
        Swal.fire({
          icon: "error",
          title: "Mật khẩu không khớp",
          showConfirmButton: false,
          timer: 3000,
        });
        setFormData({ ...formData, password: "" });
        setRePassword("");
        return;
      }
      const token = localStorage.getItem('tokens');
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.post('http://localhost:4060/api/users', formData, {
        headers: {
          'x-access-token': token
        }
      });
      if (response) {
        setShowModal(false);
        onReload();
        Swal.fire({
          icon: "success",
          title: "Tạo mới thành công",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      console.error("Không thể tạo đơn hàng:", error);
      let errorMessage = "Could not creat employee";

      // Kiểm tra nếu có thông báo lỗi từ phản hồi của API
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: errorMessage,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };


  return (
    <>
      <button onClick={openModal} className="btn">
        Create
      </button>

      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onSubmit={handleSubmit}>
          <table className="table">
            <tbody>
              <tr>
                <td>User Name</td>
                <td>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>password</td>
                <td>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Re-Password</td>
                <td>
                  <input
                    type="Password"
                    className="input"
                    value={rePassword}
                    onChange={(e) => setRePassword(e.target.value)}
                    required
                  ></input>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button onClick={closeModal}>Cancel</button>
                  <input type="submit" value="Create" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </Modal>
    </>
  );
}

export default CreateEmployee;
