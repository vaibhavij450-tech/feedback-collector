import { useState } from "react";
import { updateFeedback } from "../services/feedback-service";

/**
 * Displays an individual feedback record.
 *
 * Customers can edit the feedback only if they
 * own the record.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.feedback - Feedback record.
 * @param {Function} props.onFeedbackUpdated - Callback after successful update.
 * @returns {JSX.Element} Feedback item UI.
 */
function FeedbackItem({
  feedback,
  onFeedbackUpdated,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: feedback.name,
    email: feedback.email,
    message: feedback.message,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  /**
   * Updates the local form state when an input changes.
   *
   * @param {Object} event - Input change event.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  /**
   * Opens the feedback editing form.
   */
  const handleEdit = () => {
    setError("");

    setFormData({
      name: feedback.name,
      email: feedback.email,
      message: feedback.message,
    });

    setIsEditing(true);
  };

  /**
   * Cancels the current edit operation.
   */
  const handleCancel = () => {
    setIsEditing(false);
    setError("");
  };

  /**
   * Updates the feedback belonging to the current customer.
   *
   * @param {Object} event - Form submission event.
   */
  const handleSave = async (event) => {
    event.preventDefault();

    setIsSaving(true);
    setError("");

    try {
      const updatedFeedback = await updateFeedback(
        feedback._id,
        formData
      );

      onFeedbackUpdated(updatedFeedback);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isEditing) {
    return (
      <div className="feedback-card">
        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label className="form-label">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Message
            </label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="form-control"
              rows="4"
              required
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

          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-dark"
              disabled={isSaving}
            >
              {isSaving
                ? "Saving..."
                : "Save Changes"}
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="feedback-card">
      <div className="feedback-card-header">
        <div>
          <h3>{feedback.name}</h3>
          <p>{feedback.email}</p>
        </div>
      </div>

      <p className="feedback-message">
        {feedback.message}
      </p>

      <small>
        {new Date(feedback.createdAt).toLocaleString()}
      </small>

      {/* Show Edit only for the owner */}
      {feedback.isOwner && (
        <div className="mt-3">
          <button
            type="button"
            className="btn btn-outline-dark btn-sm"
            onClick={handleEdit}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default FeedbackItem;