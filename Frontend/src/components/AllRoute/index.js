import {   useRoutes } from "react-router-dom";
import { routes } from "../../routes";
// import { useContext } from "react";
// import { AuthContext } from "../../AuthContext";

function AllRoute() {

  // const { isLoggedIn } = useContext(AuthContext);

  const element = useRoutes(routes);

  // if (!isLoggedIn) {
  //   // return <Navigate to="login" />;
  //   // window.location.href = '/login';
  // }

  // console.log(isLoggedIn);

  return <>{element}</>;
}

export default AllRoute;
