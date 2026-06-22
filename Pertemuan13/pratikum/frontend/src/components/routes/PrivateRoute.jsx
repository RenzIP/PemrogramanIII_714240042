import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAuthToken } from "../../services/auth";

export default function PrivateRoute() {
  const location = useLocation();

  if (!getAuthToken()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
