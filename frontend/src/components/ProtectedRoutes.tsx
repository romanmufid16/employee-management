import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, checkAuthStatus } = useAuth();
  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuthStatus();
    };
    verifyAuth();
  }, [checkAuthStatus]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
