// import { Navigate } from "react-router-dom";
import "./App.css";
// import { AuthProvider, useAuth } from "./AuthContext";
import AllRoute from "./components/AllRoute";
import { Navigate  } from "react-router-dom";

function App() {

  return (
    <>
      {/* <AuthProvider> */}
        <AllRoute />
      {/* </AuthProvider> */}
    </>
  );
}

export function PrivateRoute({ component }) {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');
  console.log(isAuthenticated);
  // const { isLoggedIn } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return component;
}


export default App;
