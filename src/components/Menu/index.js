import { NavLink } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaGift, FaShoppingCart } from "react-icons/fa";

//sass ./src/utils/scss/style.scss ./src/utils/css/style.css --watch

function Menu() {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar--header">
          <img
            className="sidebar--header__image"
            src="/images/Logo.png"
            alt="logo"
          />
          <div className="sidebar--header__title">Sales Manager</div>
        </div>
        <div className="sidebar--menu">
          <ul className="menu">
            <li className="active">
              <MdOutlineRemoveRedEye className="icon" />
              <NavLink className="navlink" to="/">
                Dashboard
              </NavLink>
            </li>
            <li>
              <FaGift className="icon" />
              <NavLink className="navlink" to="/ordersList">
                Orders List
              </NavLink>
            </li>
            <li>
              <FaShoppingCart className="icon" />
              <NavLink className="navlink" to="/products">
                Products
              </NavLink>
            </li>
            <li>
              <FaShoppingCart className="icon" />
              <NavLink className="navlink" to="/">
                Report
              </NavLink>
            </li>
            <li>
              <FaShoppingCart className="icon" />
              <NavLink className="navlink" to="/">
                Stores
              </NavLink>
            </li>
            <li>
              <FaShoppingCart className="icon" />
              <NavLink className="navlink" to="/">
                Customers
              </NavLink>
            </li>
            <li>
              <FaShoppingCart className="icon" />
              <NavLink className="navlink" to="/">
                Support
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Menu;
