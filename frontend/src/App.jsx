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

function CustomerPage() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const handleFeedbackUpdated = (updatedFeedback) => {
    setFeedback((previous) =>
      previous.map((item) =>
        item._id === updatedFeedback._id
          ? updatedFeedback
          : item
      )
    );
  };

  const handleFeedbackDeleted = (deletedId) => {
    setFeedback((previous) =>
      previous.filter((item) => item._id !== deletedId)
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
          onFeedbackDeleted={handleFeedbackDeleted}
        />
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<CustomerPage />}
        />

        <Route
          path="/admin/login"
          element={<LoginPage />}
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <Navigate
              to="/admin/login"
              replace
            />
          }
        />

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