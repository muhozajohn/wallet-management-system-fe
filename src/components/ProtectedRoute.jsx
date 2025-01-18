import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsAuthenticated } from "../redux/auth/authSlice";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
