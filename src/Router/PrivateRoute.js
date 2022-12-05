import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

export default function PrivateRoute({ children }) {
  const auth = useAuth();
  const currentUser = auth.getCurrentUser();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/logIn" state={{ path: location.pathname }} />;
  }

  return children;
}
