import { Navigate, Outlet } from "react-router";

const PrivateRoutes = () => {
  const token = localStorage.getItem("access_token");

  let auth = !!token;
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
