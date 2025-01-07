import React from "react";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";

interface DashboardProps {
  children : React.ReactNode
}

const DashboardPage: React.FC<DashboardProps> = ({children}) => {
  const { user } = useAuth();
  document.title = `${user?.name} | Dashboard Page`;
  return (
    <div className="min-h-screen flex">
      <Sidebar/>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default DashboardPage;
