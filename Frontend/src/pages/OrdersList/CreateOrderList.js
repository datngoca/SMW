import { useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import 'sweetalert2/src/sweetalert2.scss';
import { createResource } from "../../services/services";
import Modal from "react-modal";
import '../../utils/css/style.css';

function CreateOrderList(props) {
  const order = "order";
  const { onReload } = props;
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});

  // useEffect(() => {
  //   const fetchApi = async () => {
  //       const result = await ();
  //       setDataCategory(result);
  //   }
  //   fetchApi();
  // }, []);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleChange = (e) => {
    const name = e.target.name;
    var value = e.target.value;
    setData({
      ...data,
      [name]: value,
    });
  };

  const openModal = () => {
    setShowModal(true);
}

const closeModal = () => {
    setShowModal(false);
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createResource(order, data);
    if (result) {
      setShowModal(false);
      onReload();
      Swal.fire({
        icon: "success",
        title: "Tạo mới thành công",
        showConfirmButton: false,
        timer: 3000,
      });
      // setTimeout(() => {
      //   window.history.back();
      // }, 2000);
    }
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
                <td>ID</td>
                <td>
                  <input
                    type="text"
                    name="_id"
                    onChange={handleChange}
                    required
                  ></input>
                </td>
              </tr>
              {/* {data.length > 0 && (
                <tr>
                  <td>Danh mục</td>
                  <td>
                    <select name="category" onChange={handleChange}>
                      {data.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              )} */}
              <tr>
                <td>customer</td>
                <td>
                  <input
                    type="text"
                    name="customer"
                    onChange={handleChange}
                    required
                  ></input>
                </td>
              </tr>
              <tr>
                <td>product</td>
                <td>
                  <input
                    type="text"
                    name="product"
                    onChange={handleChange}
                    required
                  ></input>
                </td>
              </tr>
              <tr>
                <td>shipping_address</td>
                <td>
                  <input
                    type="text"
                    name="shipping_address"
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
                    onChange={handleChange}
                    required
                  ></input>
                </td>
              </tr>
              <tr>
                <td>payment_status</td>
                <td>
                  <input
                    type="text"
                    name="payment_status"
                    onChange={handleChange}
                    required
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <button onClick={closeModal}>Cancel</button>
                </td>
                <td>
                  <input type="submit" value="Create" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </Modal>
    </>
  );
}

export default CreateOrderList;
