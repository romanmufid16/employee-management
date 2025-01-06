import React from "react";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const { setIsAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  document.title = "Dashboard Page";

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <button onClick={handleLogout} className="bg-red-500 m-4">
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
