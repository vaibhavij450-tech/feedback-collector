import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/auth-service";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      await loginAdmin(email, password);
      navigate("/admin/dashboard", { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-brand">FC</div>

        <div className="admin-login-content">
          <span className="admin-login-label">ADMIN ACCESS</span>

          <h1>Welcome back.</h1>

          <p className="admin-login-subtitle">
            Sign in to manage and review customer feedback.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="admin-login-field">
              <label htmlFor="admin-email">Email</label>

              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>

            <div className="admin-login-field">
              <label htmlFor="admin-password">Password</label>

              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="admin-login-error" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="admin-login-button"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;