import "bootstrap/dist/css/bootstrap.min.css";
import "../../utils/css/style.css";
import { FaBell } from "react-icons/fa6";

import Menu from "../Menu";
import { NavLink, Outlet } from "react-router-dom";

const Admin = () => {
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
                <FaBell className="content--header__icon" />
                <div className="content--header__login">
                  <span className="name">Admin</span>
                  <NavLink to="/">
                    <img className="image" src="images/Logo.png" alt="Login" />
                  </NavLink>
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
