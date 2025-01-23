import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const { state } = useAuth();

  return state.role ? <Outlet /> : <Navigate to='/' replace />;
}
