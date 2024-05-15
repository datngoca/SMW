import { useEffect, useState } from "react";
import { getResource } from "../../services/services";
import GoBack from "../../components/GoBack";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";

function ProductList(props) {
  const api = "products";
  const { reload } = props;
  const [data, setData] = useState([]);
  const [editReload, setEditReload] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6); // Số mục trên mỗi trang
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
  const handleDeleteProduct = (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      axios
        .delete(`http://localhost:4060/api/products/${productId}`)
        .then((response) => {
          // Xóa sản phẩm thành công, thực hiện các thao tác cập nhật danh sách sản phẩm hoặc giao diện
          console.log("Xóa sản phẩm thành công:", response.data);
          reload();
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error("Lỗi khi xóa sản phẩm:", error);
        });
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
                        <span className="box">
                          <button className="btn--delete me-1 btn">
                            <MdDelete />
                          </button>
                          <button className="btn--edit btn">
                            <MdEdit />
                          </button>
                        </span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          <div style={{ position: "absolute", bottom: 15, right: 20 }}>
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
        </div>
      </div>
    </>
  );
}

export default ProductList;
