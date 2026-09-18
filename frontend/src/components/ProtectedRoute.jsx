import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { checkAdminAuth } from "../services/auth-service";

/**
 * Protects administrator-only routes by checking
 * the authentication session with the backend.
 *
 * @param {Object} props - Component properties.
 * @param {JSX.Element} props.children - Protected page.
 * @returns {JSX.Element} Protected page or login redirect.
 */
function ProtectedRoute({ children }) {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuthentication = async () => {
      const authenticated = await checkAdminAuth();

      setIsAuthenticated(authenticated);
      setIsChecking(false);
    };

    verifyAuthentication();
  }, []);

  if (isChecking) {
    return (
      <div className="container py-5 text-center">
        <div
          className="spinner-border"
          role="status"
          aria-label="Checking authentication"
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;