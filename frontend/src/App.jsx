import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import FeedbackPage from "./pages/FeedbackPage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import {
  getFeedback,
  createFeedback,
} from "./services/feedback-service";

import "./App.css";

/**
 * Displays the public customer feedback interface.
 *
 * Customers can submit feedback, view existing feedback,
 * and edit feedback that belongs to them.
 *
 * @returns {JSX.Element} Customer feedback interface.
 */
function CustomerPage() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /**
   * Loads feedback records from the backend.
   *
   * @returns {Promise<void>} Resolves after feedback is loaded.
   */
  const loadFeedback = async () => {
    try {
      setError("");

      const data = await getFeedback();

      setFeedback(data);
    } catch (error) {
      console.error(error);
      setError("Unable to load feedback.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  /**
   * Creates a new feedback record.
   *
   * @param {Object} newFeedback - Feedback submitted by the customer.
   * @returns {Promise<void>} Resolves after feedback is created.
   */
  const handleAddFeedback = async (newFeedback) => {
    try {
      const createdFeedback = await createFeedback(newFeedback);

      setFeedback((previous) => [
        createdFeedback,
        ...previous,
      ]);
    } catch (error) {
      console.error(error);
      setError("Unable to submit feedback.");
    }
  };

  /**
   * Updates an existing feedback record in local state.
   *
   * @param {Object} updatedFeedback - Updated feedback returned by the backend.
   */
  const handleFeedbackUpdated = (updatedFeedback) => {
    setFeedback((previous) =>
      previous.map((item) =>
        item._id === updatedFeedback._id
          ? updatedFeedback
          : item
      )
    );
  };

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-content">
          <span className="badge">
            SHARE YOUR EXPERIENCE
          </span>

          <h1>
            Feedback, made <span>human.</span>
          </h1>

          <p>
            Tell us what's working and what we can improve.
            Your feedback helps us get better every day.
          </p>
        </div>
      </header>

      <main className="container">
        <FeedbackPage
          feedback={feedback}
          loading={loading}
          error={error}
          onFeedbackAdded={handleAddFeedback}
          onFeedbackUpdated={handleFeedbackUpdated}
        />
      </main>
    </div>
  );
}

/**
 * Main application router.
 *
 * @returns {JSX.Element} Application routes.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public customer interface */}
        <Route
          path="/"
          element={<CustomerPage />}
        />

        {/* Separate administrator login */}
        <Route
          path="/admin/login"
          element={<LoginPage />}
        />

        {/* Protected administrator dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirect /admin to the administrator login */}
        <Route
          path="/admin"
          element={
            <Navigate
              to="/admin/login"
              replace
            />
          }
        />

        {/* Redirect unknown routes to the customer page */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;