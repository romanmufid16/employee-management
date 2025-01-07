import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  document.title = "Login Page";

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.post("/auth/login", {
        username,
        password,
      });
      setLoading(false);
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      setErrorMessage(
        error.response ? error.response.data.errors : error.message
      );
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex antialiased font-ubuntu text-secondary">
      <div className="w-1/4 flex flex-col justify-center items-start px-5">
        <h1 className="text-primary text-xl  font-semibold">
          Employee Management
        </h1>
        <span className="text-primary text-3xl font-grotesk mb-4">
          Login to your account
        </span>
        <p className="mb-3">Enter your credentials</p>
        <hr className="border border-secondary/20 w-full mb-2" />
        {errorMessage && <p className="text-red-500 mb-3">{errorMessage}</p>}
        <form action="" className="text-sm w-full" onSubmit={handleLogin}>
          <div className="mb-3 space-y-2">
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="border border-secondary/50 rounded-md p-2 w-full"
              required
            />
          </div>
          <div className="mb-5 space-y-2">
            <label htmlFor="Password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="•••••••••••"
              className="border border-secondary/50 rounded-md p-2 w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="font-grotesk font-semibold bg-primary text-white px-4 py-2 text-base border border-black rounded-md [box-shadow:5px_5px_0px_black]"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
      <div className="w-3/4">
        <img
          src="img/login_desktop.svg"
          alt="login"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
