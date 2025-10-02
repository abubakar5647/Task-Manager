import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./screens/login";
import Register from "./screens/register";
import Dashboard from "./screens/Dashboard";
import ProtectedRoute from "./components/isAuthenticate";

export default function App() {
  const authString = localStorage.getItem("auth");
  const auth = authString ? JSON.parse(authString) : null;
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            auth?.loggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            auth?.loggedIn ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            auth?.loggedIn ? <Navigate to="/dashboard" replace /> : <Register />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
