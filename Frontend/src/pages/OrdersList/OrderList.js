import React, { useEffect, useState } from "react";
import { getResource } from "../../services/services";
import GoBack from "../../components/GoBack";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";

function ProductList(props) {
    const api = "order";
    const { reload } = props;
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(7); // Số mục trên mỗi trang
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

    console.log(data);

    return (
        <>
            <div className="card mb-3">
                <div className="card-header">
                    <span className="card-button">
                        <GoBack />
                    </span>
                    <strong>Danh sách sản phẩm</strong>
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
                                <th className="box box-thead">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.data &&
                                data.data
                                    .slice(startIndex, startIndex + pageSize)
                                    .map((item, index) => (
                                        <tr className="column" key={item._id}>
                                            <td className="box">{startIndex + index + 1}</td>
                                            <td className="box">{new Date(item.order_date).toLocaleDateString()}</td>
                                            <td className="box">{item.shipping_address}</td>
                                            <td className="box">{item.payment_method}</td>
                                            <td className="box">{item.customer[0].Name}</td>
                                            <td className="box">{item.customer[0].phonenumber}</td>
                                            <td className="box">
                                                <MdDelete />
                                            </td>
                                        </tr>
                                    ))}
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

export default ProductList;
