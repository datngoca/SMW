import { useEffect, useState } from "react";
import { getResource } from "../../services/services";
import GoBack from "../../components/GoBack";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

import CreateProducts from "./CreateProducts";
import DeleteProducts from "./DeleteProducts";
import EditProducts from "./EditProducts";
import axios from "axios";

function ProductList(props) {
  const api = "products";
  const { reload } = props;
  const [data, setData] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5); // Số mục trên mỗi trang
  const [totalPages, setTotalPages] = useState(0);
  const [startIndex, setStartIndex] = useState(0); // Chỉ số bắt đầu của mỗi trang
  const [editReload, setEditReload] = useState(false);

  const handleReload = () => {
    setEditReload(!editReload);
  };
  // useEffect(() => {
  //   const fetchData = async () => {
  //     let result;
  //     if (searchKeyword) {
  //       result = axios.get(`http://localhost:4060/api/products/search/${encodeURIComponent(searchKeyword)}`)
  //     } else {
  //       result = await getResource(api);
  //     }
  //     console.log(result);
  //     setData(result.data);
  //     const totalPages = Math.ceil(result.data.length / pageSize);
  //     setTotalPages(totalPages);
  //     setStartIndex((currentPage - 1) * pageSize);
  //   };
  //   fetchData();
  // }, [reload, currentPage, pageSize, editReload, searchKeyword]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (searchKeyword) {
          // Nếu có từ khóa tìm kiếm, gọi API tìm kiếm và sử dụng await để đợi kết quả
          result = await axios.get(`http://localhost:4060/api/products/search/${encodeURIComponent(searchKeyword)}`);
        } else {
          // Nếu không có từ khóa tìm kiếm, gọi API lấy tất cả sản phẩm
          result = await getResource(api);
        }
        
        console.log(result); // Kiểm tra kết quả
        
        if (result instanceof Promise) {
          // Nếu `result` là một promise, sử dụng `.then()` để trích xuất dữ liệu
          result.then(response => {
            setData(response.data); // Lưu trữ dữ liệu từ API vào state
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
          <strong>Danh sách sản phẩm</strong>
          <span className="card-button">
            <CreateProducts onReload={handleReload} />
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
        <div className="card-body" style={{ position: "relative", overflow: "auto" }}>
          <table className="table text-center">
            <thead>
              <tr className="column column-thead">
                <th className="box box-thead">STT</th>
                <th className="box box-thead">Name</th>
                <th className="box box-thead">Category</th>
                <th className="box box-thead">No Of Producst</th>
                <th className="box box-thead">Cost Value</th>
                <th className="box box-thead">Service Provider</th>
                <th className="box box-thead">Status</th>
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
                      <td className="box">{item.name}</td>
                      <td className="box">{item.category}</td>
                      <td className="box">{item.no_of_Products}</td>
                      <td className="box">${item.price}</td>
                      <td className="box">{item.serviceProvider}</td>
                      <td className="box">
                        {item.no_of_Products === 0 ? "Hết hàng" : "Còn hàng"}{" "}
                      </td>
                      <td className="box">
                        <EditProducts onReload={handleReload} item={item} />
                        <DeleteProducts onReload={handleReload} item={item} />
                      </td>
                    </tr>
                  ))}
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

export default ProductList;
