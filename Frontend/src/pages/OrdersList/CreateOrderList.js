import React, { useState } from "react";
import Swal from "sweetalert2";
import Modal from "react-modal";
import axios from "axios";
import { TiDelete } from "react-icons/ti";



function CreateOrderList(props) {
  const [showModal, setShowModal] = useState(false);
  const { onReload } = props
  const [formData, setFormData] = useState({
    customerPhoneNumber: "",
    productNames: [],
    order_date: "",
    shipping_address: "",
    payment_method: "",
    payment_status: ""
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

  const handleAddProduct = () => {
    setFormData({ ...formData, productNames: [...formData.productNames, ""] });
  };

  const handleProductChange = (index, value) => {
    const newproductNames = [...formData.productNames];
    newproductNames[index] = value;
    setFormData({ ...formData, productNames: newproductNames });
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

      const response = await axios.post("http://localhost:4060/api/order", formData, {
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
      console.error("Could not create order:", error);
      // Handle error and show appropriate message to the user
    }
  };
  const handleMinusProduct = (index) => {
    const newProductNames = formData.productNames.filter((_, i) => i !== index);
    setFormData({ ...formData, productNames: newProductNames });
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
                <td>Phone Customer</td>
                <td>
                  <input
                    type="text"
                    name="customerPhoneNumber"
                    value={formData.customerPhoneNumber}
                    onChange={handleChange}
                    required
                  ></input>
                </td>
              </tr>
              {/* Render product input fields dynamically */}
              {formData.productNames.map((product, index) => (
                <tr key={index}>
                  <td>Product {index + 1}</td>
                  <td>
                    <input
                      type="text"
                      value={product}
                      onChange={(e) => handleProductChange(index, e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <button style={{border:"none", background:"none"}} type="button" onClick={() => handleMinusProduct(index)}><TiDelete /></button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="2">
                  <button type="button" onClick={handleAddProduct}>Add Product</button>
                </td>
              </tr>
              {/* Other form fields */}
              {/* Add other form fields similarly */}
              <tr>
                <td>Order date</td>
                <td>
                  <input
                    type="date"
                    name="order_date"
                    value={formData.order_date}
                    onChange={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>shipping_address</td>
                <td>
                  <input
                    type="text"
                    name="shipping_address"
                    value={formData.shipping_address}
                    onChange={handleChange}
                    required
                  ></input>
                </td>
              </tr>
              <tr>
                <td>payment_method</td>
                <td>
                  <input
                    type="text"
                    name="payment_method"
                    value={formData.payment_method}
                    onChange={handleChange}
                    required
                  ></input>
                </td>
              </tr>
              <tr>
                <td>payment_status</td>
                <td>
                  <select
                    name="payment_status"
                    value={formData.payment_status}
                    onChange={handleChange}
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td colSpan="2">
                  <button onClick={closeModal}>Cancel</button>
                  <input type="submit" value="Create" />
                </td>
              </tr>
              <a href="/Customer">Tạo khách hàng mới</a>
            </tbody>
          </table>
        </form>
      </Modal>
    </>
  );
}

export default CreateOrderList;
