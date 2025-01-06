import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/authContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import DashboardPage from "./pages/DashboardPage";

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
                <DashboardPage />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
