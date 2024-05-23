import React, { useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import 'sweetalert2/src/sweetalert2.scss';
import Modal from "react-modal";
import axios from "axios";

function CreateProducts(props) {
  const [showModal, setShowModal] = useState(false);
  const { onReload } = props;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    address: "",
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
      const token = localStorage.getItem('tokens');
      if (!token) {
        throw new Error("No token found");
      }

      const result = await axios.post("http://localhost:4060/api/customer", formData, {
        headers: {
          'x-access-token': token
        }
      });
      if (result) {
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
      // Xử lý lỗi và hiển thị thông báo phù hợp cho người dùng
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
                <td>Tên khách hàng</td>
                <td>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Số điện thoại</td>
                <td>
                  <input
                    type="text"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Địa Chỉ</td>
                <td>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
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

export default CreateProducts;
