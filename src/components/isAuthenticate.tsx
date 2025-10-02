import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const authString = localStorage.getItem("auth");
  const auth = authString ? JSON.parse(authString) : null;

  if (!auth || !auth.loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
