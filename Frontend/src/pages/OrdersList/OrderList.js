import React, { useEffect, useState } from "react";
import { getResource } from "../../services/services";
import GoBack from "../../components/GoBack";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { TiMinus, TiPlus } from "react-icons/ti";
import axios from 'axios';



function OrdersList(props) {
    const api = "order";
    const { reload } = props;
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5); // Số mục trên mỗi trang
    const [totalPages, setTotalPages] = useState(0);
    const [startIndex, setStartIndex] = useState(0); // Chỉ số bắt đầu của mỗi trang

    useEffect(() => {
        const fetchData = async () => {
            const result = await getResource(api);
            setData(result);
            const totalPages = Math.ceil(result.data.length / pageSize);
            setTotalPages(totalPages);
            // Tính lại chỉ số bắt đầu khi dữ liệu thay đổi
            setStartIndex((currentPage - 1) * pageSize);
        };
        fetchData();
    }, [reload, currentPage, pageSize]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            // Cập nhật chỉ số bắt đầu khi chuyển trang
            setStartIndex(currentPage * pageSize);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            // Cập nhật chỉ số bắt đầu khi chuyển trang
            setStartIndex((currentPage - 2) * pageSize);
        }
    };
    const handleDeleteProduct = (item_id, productId) => {
        axios.delete(`http://localhost:4060/api/order/${item_id}/products/${productId}`)
            .then(response => {
                // Xóa sản phẩm thành công, thực hiện các thao tác cập nhật danh sách sản phẩm hoặc giao diện
                console.log("Xóa sản phẩm thành công:", response.data);
                reload();
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error("Lỗi khi xóa sản phẩm:", error);
            });
    };
    const handleCreateProduct = (itemId, productId) => {
        axios.post(`http://localhost:4060/api/order/${itemId}/products/${productId}`)
            .then(response => {
                // Tạo sản phẩm thành công, thực hiện các thao tác cập nhật danh sách sản phẩm hoặc giao diện
                console.log("Tạo sản phẩm thành công:", response.data);
                reload(); // hoặc fetchData();
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error("Lỗi khi tạo sản phẩm:", error);
            });
    };


    console.log(data);

    return (
        <>
            <div className="card mb-3">
                <div className="card-header">
                    <span className="card-button">
                        <GoBack />
                    </span>
                    <strong>Danh sách đặt hàng</strong>
                </div>
                <div className="card-body" style={{ position: "relative" }}>
                    <table className="table text-center">
                        <thead>
                            <tr className="column column-thead">
                                <th className="box box-thead">STT</th>
                                <th className="box box-thead">Ngày Đặt Hàng</th>
                                <th className="box box-thead">Địa chỉ Giao Hàng</th>
                                <th className="box box-thead">Phương Thức Thanh Toán</th>
                                <th className="box box-thead">Khách Hàng</th>
                                <th className="box box-thead">Số điện thoại</th>
                                <th className="box box-thead">Sản phẩm</th>
                                <th className="box box-thead">Tổng giá đơn hàng</th>
                                <th className="box box-thead">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data &&
                                data.data
                                    .slice(startIndex, startIndex + pageSize)
                                    .map((item, index) => {
                                        let total = 0; // Initialize total price variable
                                        let productsCount = {};
                                        item.product.forEach(product => {
                                            total += product.price; // Add price of each product to total
                                            // Increase count for each product id
                                            productsCount[product._id] = (productsCount[product._id] || 0) + 1;
                                        });

                                        return (
                                            <tr className="column" key={item._id}>
                                                <td className="box">{startIndex + index + 1}</td>
                                                <td className="box">{new Date(item.order_date).toLocaleDateString()}</td>
                                                <td className="box">{item.shipping_address}</td>
                                                <td className="box">{item.payment_method}</td>
                                                <td className="box">{item.customer && item.customer.length > 0 ? item.customer[0].Name : 'N/A'}</td>
                                                <td className="box">{item.customer && item.customer.length > 0 ? item.customer[0].phonenumber : 'N/A'}</td>
                                                <td className="box">
                                                    <ul>
                                                        {/* Map through product array to render product names */}
                                                        {item.product.map((product, index) => (
                                                            // Check if current product has already been rendered
                                                            index === item.product.findIndex(prod => prod._id === product._id) && (
                                                                <li key={product._id} >
                                                                    <span>{product.name} <br /></span>
                                                                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid black" }}>
                                                                        <button className="button-number" onClick={() => handleDeleteProduct(item._id, product._id)}><TiMinus /></button>
                                                                        <span>{productsCount[product._id]}</span>
                                                                        <button className="button-number" onClick={() => handleCreateProduct(item._id, product._id)}><TiPlus /></button>
                                                                    </span>
                                                                </li>
                                                            )
                                                        )
                                                        )}
                                                        <a herf="">Thêm</a>
                                                    </ul>
                                                </td>
                                                <td className="box">${total}</td> {/* Display total price */}
                                                <button className="box button">
                                                    <MdDelete />
                                                </button>
                                            </tr>
                                        );
                                    })}


                        </tbody>
                    </table>
                    <div style={{ position: "absolute", bottom: 15, right: 20 }}>
                        <button className="button" onClick={handlePreviousPage} disabled={currentPage === 1}>
                            <GrLinkPrevious />
                        </button>
                        <button className="button" onClick={handleNextPage} disabled={currentPage === totalPages}>
                            <GrLinkNext />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrdersList;
