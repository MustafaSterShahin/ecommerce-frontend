import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
  roles: string[];
}

function PrivateRoute({ children, roles }: PrivateRouteProps) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const userRole = payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (!roles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
  } catch (error) {
    console.error("Token decode edilemedi:", error);
    return <Navigate to="/login" replace />;
  }
}

export default PrivateRoute;
