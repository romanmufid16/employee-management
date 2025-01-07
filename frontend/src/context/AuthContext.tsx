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
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
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

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("isAuthenticated");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const checkAuthUser = async () => {
      // if (!isAuthenticated) return;
      try {
        const response = await axiosInstance.get("/auth/check");
        console.log(response.data.data);
        setUser(response.data.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.log("User not authenticated");
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
      }
    };
    if (isAuthenticated) {
      checkAuthUser();
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser, logout }}
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
