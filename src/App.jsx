import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import Todo from "./TodoFile";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true"
  );
  const login = () => {
    localStorage.setItem("auth", "true");
    setIsAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem("auth");
    setIsAuthenticated(false);
  };
  const PrivateRoute = ({ children }) => {
    return localStorage.getItem("auth") === "true" ? (
      children
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginForm login={login} />} />

      <Route
        path="/todo"
        element={
          <PrivateRoute>
            <Todo logout={logout} />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;