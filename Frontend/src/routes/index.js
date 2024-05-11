import Admin from "../components/Admin";
import DashBoard from "../components/Dashboard";
import OrdersList from "../pages/OrdersList";
import Products from "../pages/Products";
import Customer from "../pages/Customer";
import Login from "../pages/Login";
import { PrivateRoute } from "../App";
import Register from "../pages/Register";
// import { useAuth } from '../AuthContext';
// import { Navigate } from 'react-router-dom';

export const routes = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "/",
    element: <PrivateRoute component={<Admin />} />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "ordersList",
        element: <OrdersList />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "customer",
        element: <Customer />,
      },
    ],
  },
];
