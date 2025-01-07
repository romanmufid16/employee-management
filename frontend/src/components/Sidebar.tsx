import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] =
    useState<boolean>(false);

  const toggleEmployeeDropdown = () => {
    setIsEmployeeDropdownOpen(!isEmployeeDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };
  return (
    <aside className="bg-primary flex flex-col items-start px-6 py-8 w-64 flex-0 text-white">
      <h1 className="font-grotesk text-2xl font-semibold mb-5">Dashboard</h1>
      <ul className="w-full">
        <li
          className={`transition duration-300 ease-in-out hover:bg-white/10 rounded-lg py-2 px-4 w-full cursor-pointer ${
            isEmployeeDropdownOpen ? "bg-black/20 rounded-b-none" : ""
          }`}
          onClick={toggleEmployeeDropdown}
        >
          <span>Employee</span>
        </li>
        {isEmployeeDropdownOpen && (
          <ul className="space-y-2 pl-2 bg-black/10 rounded-b-md">
            <li className="hover:bg-primary-light rounded-lg py-2 px-4">
              <Link to="/employee/add">Add Employee</Link>
            </li>
            <li className="hover:bg-primary-light rounded-lg py-2 px-4">
              <Link to="/dashboard/employees">Employee List</Link>
            </li>
          </ul>
        )}
        <li className="transition duration-300 ease-in-out hover:bg-white/10 rounded-lg py-2 px-4 w-full">
          <Link to="/lorem-ipsum">Lorem Ipsum</Link>
        </li>
        <li className="transition duration-300 ease-in-out hover:bg-white/10 rounded-lg py-2 px-4 w-full">
          <p onClick={handleLogout} className="cursor-pointer">
            Logout
          </p>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
