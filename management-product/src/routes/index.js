import Admin from '../components/Admin'
import DashBoard from '../components/Dashboard';
import OrdersList from '../pages/OrdersList';
import Products from '../pages/Products';

export const routes = [
  {
    path: "/",
    element: <Admin />,
    children: [
      {
        path: "/",
        element: <DashBoard />
      },
      {
        path: "ordersList",
        element: <OrdersList />
      },
      {
        path: "products",
        element: <Products />
      },
    ]
  }
]