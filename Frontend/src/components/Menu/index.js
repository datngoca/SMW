import { NavLink } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaGift, FaShoppingCart, FaProductHunt } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import { BiSolidReport } from "react-icons/bi";
import { BiSupport } from "react-icons/bi";
import { IoPersonCircleSharp } from "react-icons/io5";



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
              <FaProductHunt className="icon" />
              <NavLink className="navlink" to="/products">
                Products
              </NavLink>
            </li>
            <li>
              <PiUsersThreeFill className="icon" />
              <NavLink className="navlink" to="/Customer">
                Customers
              </NavLink>
            </li>
            <li>
              <IoPersonCircleSharp className="icon" />
              <NavLink className="navlink" to="/employee">
                Employee
              </NavLink>
            </li>

            <li>
              <BiSolidReport className="icon" />
              <NavLink className="navlink" to="/chart">
                Report
              </NavLink>
            </li>
            <li>
              <BiSupport className="icon" />
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
