import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginAdmin } from "../services/auth-service";

/**
 * Displays the administrator login form.
 *
 * @returns {JSX.Element} Administrator login page.
 */
function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Submits administrator credentials to the server.
   *
   * @param {Object} event - Form submission event.
   * @returns {Promise<void>} Resolves after authentication is completed.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      await loginAdmin(email, password);

      navigate("/admin/dashboard", {
        replace: true,
      });
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h1 className="h3 mb-2">
                Admin Login
              </h1>

              <p className="text-muted mb-4">
                Sign in to manage feedback.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="admin-email"
                    className="form-label"
                  >
                    Email
                  </label>

                  <input
                    id="admin-email"
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="admin-password"
                    className="form-label"
                  >
                    Password
                  </label>

                  <input
                    id="admin-password"
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    required
                    autoComplete="current-password"
                  />
                </div>

                {error && (
                  <div
                    className="alert alert-danger"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-dark w-100"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Signing in..."
                    : "Sign in"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;