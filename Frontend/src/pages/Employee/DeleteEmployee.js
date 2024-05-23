import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
// import { deleteResource } from "../../services/services";
import { MdDelete } from "react-icons/md";
// import { deleteResource } from "../../services/services";
import axios from "axios";


function DeleteProducts(props) {
  const token = localStorage.getItem('tokens');
  const {item, onReload}=props;
  const deleteItem = async () => {
    if (!token) {
      throw new Error("No token found");
    }
    const result = await axios.delete(`http://localhost:4060/api/users/${item._id}`, {
      headers: {
        'x-access-token': token
      }
    });
      if (result) {
        onReload();
        Swal.fire({
          title: "Đã xóa!",
          text: "Bạn đã xóa thành công.",
          icon: "success",
        });
      }
  }
 

  const handleDelete = () => {
    // console.log(item.id);
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa?",
      text: "Nếu bạn xóa thì bạn sẽ không thể khôi phục được!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vẫn xóa!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem();
      }
    });
  };

  return (
    <>
      <button onClick={handleDelete} className="btn--delete me-1 btn">
        <MdDelete />
      </button>
    </>
  );
}

export default DeleteProducts;
