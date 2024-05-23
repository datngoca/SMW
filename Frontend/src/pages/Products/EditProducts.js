import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { MdEdit } from "react-icons/md";
import axios from "axios";

function EditProducts(props) {
    const [showModal, setShowModal] = useState(false);
    const { item, onReload } = props;
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        no_of_Products: "",
        price: "",
        serviceProvider: ""
    });

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name || "",
                category: item.category || "",
                no_of_Products: item.no_of_Products || "",
                price: item.price || "",
                serviceProvider: item.serviceProvider || ""
            });
        }
    }, [item]);

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
        
            const response = await axios.put(`http://localhost:4060/api/products/${item._id}`, formData, {
              headers: {
                'x-access-token': token
              }
            });
            if (response) {
                setShowModal(false);
                onReload();
                Swal.fire({
                    icon: "success",
                    title: "Cập nhật thành công",
                    showConfirmButton: false,
                    timer: 3000,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: error.response.error,
                showConfirmButton: false,
                timer: 3000,
            });
        }
    };

    return (
        <>
            <button onClick={openModal} className="btn">
                <MdEdit />
            </button>

            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Edit Order"
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
                                    />
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
                                <td>Số lượng sản phẩm</td>
                                <td>
                                    <input
                                        type="number"
                                        name="no_of_Products"
                                        value={formData.no_of_Products}
                                        onChange={handleChange}
                                        required
                                    />
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
                                    />
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
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <button type="button" onClick={closeModal}>Cancel</button>
                                    <input type="submit" value="Update" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </Modal>
        </>
    );
}

export default EditProducts;
