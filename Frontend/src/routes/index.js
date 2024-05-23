import Admin from "../components/Admin";
import DashBoard from "../components/Dashboard";
import OrdersList from "../pages/OrdersList";
import Products from "../pages/Products";
import Customer from "../pages/Customer";
import Login from "../pages/Login";
import { PrivateRoute } from "../App";
import Register from "../pages/Register";
import CreateOrderList from "../pages/OrdersList/CreateOrderList";
import RevenueChart from "../pages/Report/chart.js";
import Employee from "../pages/Employee";
import Profile from "../pages/Profile";
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
        children: [
          {
            path: "create",
            element: <CreateOrderList />
          }
        ]
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "customer",
        element: <Customer />,
      },
      {
        path: "chart",
        element: <RevenueChart />,
      },
      {
        path: "employee",
        element: <Employee />,
      },
      {
        path: "profile",
        element: <Profile />,
      }
    ],
    
  },
];

