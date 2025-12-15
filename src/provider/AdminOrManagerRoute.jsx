import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";

export default function AdminOrManagerRoute({ children }) {
  const { userData } = useContext(AuthContext);

  if (!userData) return <Navigate to="/auth/login" />;

  if (userData.role === "manager" || userData.role === "admin") {
    return children;
  }

  return <Navigate to="/unauthorized" />;
}
