import "bootstrap/dist/css/bootstrap.min.css";
import "../../utils/css/style.css";
import { FaBell } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";

import Menu from "../Menu";
import { NavLink, Outlet } from "react-router-dom";

import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Admin = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.post("http://localhost:4060/api/auth/logout", {}, {
        headers: {
          'x-access-token': localStorage.getItem('tokens')
        }
      });
      if (response) {
        Swal.fire({
          icon: "success",
          title: "Đăng Xuất Thành Công",
          showConfirmButton: false,
          timer: 3000,
        });
        localStorage.removeItem("tokens");
        sessionStorage.setItem('isAuthenticated', 'false');
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Đăng Xuất Thất Bại",
          text: error.response.data.message,
          showConfirmButton: true,
        });
      } else {
        console.error("Đăng xuất thất bại:", error);
      }
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn đăng xuất không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Vẫn Đăng Xuất!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };
return (
  <>
    <div className="all">
      <div className="row">
        <div className="col-md-2">
          <Menu />
        </div>
        <div className="col-md-10">
          <div className="content">
            <div className="content--header">
              <div className="content--header__title">
                <span>MODERN SALES TECHNOLOGY</span>
              </div>
              <div className="content--header__login">
              <FaBell className="icon" />
                <span className="name">Admin</span>
                <NavLink to="/profile">
                  <img className="image" src="images/Logo.png" alt="Login" />
                </NavLink>
                <button className="button-logout" onClick={handleLogout}><IoIosLogOut /></button>
              </div>
            </div>
            <div className="content--table">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
};

export default Admin;
