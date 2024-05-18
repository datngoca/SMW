import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Modal from "react-modal";
import axios from "axios";
import { MdEdit } from "react-icons/md";

function EditOrderList(props) {
    const [showModal, setShowModal] = useState(false);
    const { item, onReload } = props;
    const [formData, setFormData] = useState({
        customerPhoneNumber: "",
        productNames: [],
        order_date: "",
        shipping_address: "",
        payment_method: "",
        payment_status: ""
    });

    useEffect(() => {
        if (item) {
            setFormData({
                customerPhoneNumber: item.customer.phone_number || "",
                productNames: item.product.map(product => product.name) || [],
                order_date: item.order_date || "",
                shipping_address: item.shipping_address || "",
                payment_method: item.payment_method || "",
                payment_status: item.payment_status || ""
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

    const handleProductChange = (index, value) => {
        const newProductNames = [...formData.productNames];
        newProductNames[index] = value;
        setFormData({ ...formData, productNames: newProductNames });
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
            const response = await axios.put(`http://localhost:4060/api/order/${item._id}`, formData);
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
            console.error(error.response.error);
            // Handle error and show appropriate message to the user
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
                                <td>Phone Customer</td>
                                <td>
                                    <input
                                        type="text"
                                        name="customerPhoneNumber"
                                        value={formData.customerPhoneNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                            </tr>
                            {formData.productNames.map((productName, index) => (
                                <tr key={index}>
                                    <td>Product {index + 1}</td>
                                    <td>
                                        <input
                                            type="text"
                                            name={`productName${index}`} // Use unique name for each product input
                                            value={productName} // Set value to specific product name
                                            onChange={(e) => handleProductChange(index, e.target.value)}
                                            required
                                        />
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td>Order Date</td>
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
                                <td>Shipping Address</td>
                                <td>
                                    <input
                                        type="text"
                                        name="shipping_address"
                                        value={formData.shipping_address}
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Payment Method</td>
                                <td>
                                    <input
                                        type="text"
                                        name="payment_method"
                                        value={formData.payment_method}
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Payment Status</td>
                                <td>
                                    <input
                                        type="text"
                                        name="payment_status"
                                        value={formData.payment_status}
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

export default EditOrderList;
