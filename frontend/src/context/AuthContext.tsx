import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import axiosInstance from "../api/axiosInstance";

interface User {
  employeeId: string;
  username: string;
  name: string;
  position?: string;
  role: string;
  dateOfJoining: string;
  status: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthStatus: () => Promise<void>;
  user: User | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => localStorage.getItem("isAuthenticated") === "true"
  );
  const [user, setUser] = useState<User | null>(null);

  const checkAuthStatus = async () => {
    if (!isAuthenticated) return;

    try {
      const response = await axiosInstance.get("/auth/check");
      setIsAuthenticated(true);
      localStorage.setItem("isAuthenticated", "true");
      setUser(response.data.data);
    } catch (error) {
      setIsAuthenticated(false);
      localStorage.removeItem("isAuthenticated");
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, checkAuthStatus, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
