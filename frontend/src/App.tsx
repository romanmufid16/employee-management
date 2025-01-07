import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import EmployeeList from "./components/EmployeeList";
import Overview from "./components/Overview";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Overview />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/dashboard/employees"
            element={
              <ProtectedRoutes>
                <EmployeeList />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
