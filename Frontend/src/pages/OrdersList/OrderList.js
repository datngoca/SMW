import React, { useEffect, useState } from "react";
import { getResource } from "../../services/services";
import GoBack from "../../components/GoBack";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import axios from "axios";

// import axios from 'axios';
import CreateOrderList from "./CreateOrderList";
import DeleteOrdersList from "./DeleteOrdersList";
import EditOrderList from "./EditOrder";

function OrdersList(props) {
  const api = "order";
  const { reload } = props;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  //eslint-disable-next-line
  const [pageSize, setPageSize] = useState(5); // Số mục trên mỗi trang
  const [totalPages, setTotalPages] = useState(0);
  const [startIndex, setStartIndex] = useState(0); // Chỉ số bắt đầu của mỗi trang
  const [editReload, setEditReload] = useState(false);

  const handleReload = () => {
    setEditReload(!editReload);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await getResource(api);
  //     setData(result);
  //     const totalPages = Math.ceil(result.data.length / pageSize);
  //     setTotalPages(totalPages);
  //     // Tính lại chỉ số bắt đầu khi dữ liệu thay đổi
  //     setStartIndex((currentPage - 1) * pageSize);
  //   };
  //   fetchData();
  // }, [reload, currentPage, pageSize, editReload]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (searchKeyword) {
          result = await axios.get(`http://localhost:4060/api/order/search/${encodeURIComponent(searchKeyword)}`);
        } else {
          result = await getResource(api);
        }
        console.log(result);
        if (result instanceof Promise) {
          result.then(response => {
            setData(response.data);
            const totalPages = Math.ceil(response.data.length / pageSize);
            setTotalPages(totalPages);
            setStartIndex((currentPage - 1) * pageSize);
          }).catch(error => {
            console.error("Error fetching data:", error);
            // Xử lý lỗi khi gọi API
          });
        } else {
          // Nếu `result` không phải là một promise, điều này có thể xảy ra khi getResource không trả về một promise
          setData(result); // Lưu trữ dữ liệu trực tiếp vào state
          const totalPages = Math.ceil(result.length / pageSize);
          setTotalPages(totalPages);
          setStartIndex((currentPage - 1) * pageSize);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Xử lý lỗi khi gọi API
      }
    };
    fetchData();
  }, [reload, currentPage, pageSize, editReload, searchKeyword]);

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

  return (
    <>
      <div className="card mb-3">
        <div className="card-header">
          <span className="card-button">
            <GoBack />
          </span>
          <strong>Danh sách đặt hàng</strong>
          <span className="card-button">
            <CreateOrderList onReload={handleReload} />
          </span>
          <span className="search">
            Search{" "}
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </span>
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
                    item.product.forEach((product) => {
                      total += product.price; // Add price of each product to total
                      // Increase count for each product id
                      productsCount[product._id] =
                        (productsCount[product._id] || 0) + 1;
                    });

                    return (
                      <tr className="column" key={item._id}>
                        <td className="box">{startIndex + index + 1}</td>
                        <td className="box">
                          {new Date(item.order_date).toLocaleDateString()}
                        </td>
                        <td className="box">{item.shipping_address}</td>
                        <td className="box">{item.payment_method}</td>
                        <td className="box">
                          {item.customer ? (
                            <>
                              <div>{item.customer.name}</div>
                            </>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="box">
                          {item.customer ? (
                            <>
                              <div>{item.customer.phone_number}</div>
                            </>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="box">
                          {item.product.map((product, index) => (
                            <div key={index}>
                              <span>{product.name}</span>
                              {/* Add other product details as needed */}
                            </div>
                          ))}
                        </td>
                        <td className="box">${total}</td>{" "}
                        {/* Display total price */}
                        <span className="box">
                          <EditOrderList onReload={handleReload} item={item} />
                          <DeleteOrdersList onReload={handleReload} item={item} />
                        </span>
                      </tr>
                    );
                  })}
            </tbody>
          </table>

        </div>
      </div>
      <div className="buttonnext">
        <button
          className="button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <GrLinkPrevious />
        </button>
        <button
          className="button"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <GrLinkNext />
        </button>
      </div>
    </>
  );
}

export default OrdersList;
