import React, { useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import 'sweetalert2/src/sweetalert2.scss';
import Modal from "react-modal";
// import { createResource } from "../../services/services";
import axios from 'axios';
function CreateProducts(props) {
  //const api = "products";
  const [showModal, setShowModal] = useState(false);
  const { onReload } = props;
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    no_of_Products: "",
    price: "",
    serviceProvider: ""
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await axios.post('http://localhost:4060/api/products', formData, {
  //       headers: {
  //         'x-access-token': token
  //       }
  //     });
  //     if (response) {
  //       setShowModal(false);
  //       onReload();
  //       Swal.fire({
  //         icon: "success",
  //         title: "Tạo mới thành công",
  //         showConfirmButton: false,
  //         timer: 3000,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Không thể tạo đơn hàng:", error);
  //     let errorMessage = "Không thể tạo đơn hàng";

  //     // Kiểm tra nếu có thông báo lỗi từ phản hồi của API
  //     if (error.response) {
  //       errorMessage = error.response.data.message;
  //     }

  //     Swal.fire({
  //       icon: "error",
  //       title: errorMessage,
  //       showConfirmButton: false,
  //       timer: 3000,
  //     });
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('tokens');
      if (!token) {
        throw new Error("No token found");
      }
  
      const response = await axios.post('http://localhost:4060/api/products', formData, {
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
      let errorMessage = "Không thể tạo đơn hàng";
  
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
                <td>Tên sản phẩm</td>
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
                <td>Loại sản phẩm</td>
                <td>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>Số lượng</td>
                <td>
                  <input
                    type="number"
                    name="no_of_Products"
                    value={formData.no_of_Products}
                    onChange={handleChange}
                    required
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Giá</td>
                <td>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  ></input>
                </td>
              </tr>
              <tr>
                <td>Nhà cung cấp</td>
                <td>
                  <input
                    type="text"
                    name="serviceProvider"
                    value={formData.serviceProvider}
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
