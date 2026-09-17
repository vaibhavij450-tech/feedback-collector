import { useEffect, useState } from "react";
import FeedbackPage from "./pages/FeedbackPage";
import ModalComponent from "./components/ModalComponent";
import {
  getFeedback,
  createFeedback,
  deleteFeedback,
} from "./services/feedback-service";
import "./App.css";

/**
 * Main application component.
 *
 * Handles application state and communication with the backend.
 *
 * @returns {JSX.Element} Main application UI.
 */
function App() {
  const [feedback, setFeedback] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
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
   * @param {Object} newFeedback - Feedback data submitted by the user.
   * @returns {Promise<void>} Resolves after feedback is created.
   */
  const handleAddFeedback = async (newFeedback) => {
    const createdFeedback = await createFeedback(newFeedback);

    setFeedback((previous) => [
      createdFeedback,
      ...previous,
    ]);
  };

  /**
   * Opens the delete confirmation modal.
   *
   * @param {Object} item - Feedback record selected for deletion.
   */
  const handleDeleteRequest = (item) => {
    setSelectedFeedback(item);
  };

  /**
   * Deletes the selected feedback record.
   *
   * @returns {Promise<void>} Resolves after deletion is completed.
   */
  const handleDeleteConfirm = async () => {
    if (!selectedFeedback) {
      return;
    }

    try {
      await deleteFeedback(selectedFeedback._id);

      setFeedback((previous) =>
        previous.filter(
          (item) => item._id !== selectedFeedback._id
        )
      );

      setSelectedFeedback(null);
    } catch (error) {
      console.error(error);
      setError("Unable to delete feedback.");
    }
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
          onDelete={handleDeleteRequest}
        />
      </main>
      <ModalComponent
  feedback={selectedFeedback}
  onCancel={() => setSelectedFeedback(null)}
  onConfirm={handleDeleteConfirm}
/>
    </div>
  );
}

export default App;
