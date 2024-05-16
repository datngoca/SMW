

// import { Navigate } from "react-router-dom";
// import { useContext } from "react";
import "./App.css";
// import { AuthContext, AuthProvider, useAuth } from "./AuthContext";
import AllRoute from "./components/AllRoute";
import { Navigate } from "react-router-dom";

function App() {

  // const { isLoggedIn } = useContext(AuthContext);

  // if (!isLoggedIn) {
  //   // return <Navigate to="login" />;
  //   window.location.href = '/login';
  // }

  return (
    <>
      <AllRoute />
    </>
  );
}

export function PrivateRoute({ component }) {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return component;
}

export default App;