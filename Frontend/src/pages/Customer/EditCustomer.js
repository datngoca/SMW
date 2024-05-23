import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { MdEdit } from "react-icons/md";
import axios from "axios";

function EditCustomer(props) {
    const [showModal, setShowModal] = useState(false);
    const { item, onReload } = props;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone_number: "",
        address: ""
    });

    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name||"",
                email: item.email||"",
                phone_number: item.phone_number||"",
                address: item.address||""
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
        
            const response = await axios.post(`http://localhost:4060/api/customer/${item._id}`, formData, {
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
                                <td>Tên khách hàng</td>
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
                                <td>Số điện thoại khách hàng</td>
                                <td>
                                    <input
                                        type="text"
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Địa chỉ</td>
                                <td>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
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

export default EditCustomer;
