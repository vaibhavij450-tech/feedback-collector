import { useState } from "react";
import {
  updateFeedback,
  deleteOwnFeedback,
} from "../services/feedback-service";

function FeedbackItem({
  feedback,
  onFeedbackUpdated,
  onFeedbackDeleted,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: feedback.name,
    email: feedback.email,
    message: feedback.message,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setError("");

    setFormData({
      name: feedback.name,
      email: feedback.email,
      message: feedback.message,
    });

    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError("");

    setFormData({
      name: feedback.name,
      email: feedback.email,
      message: feedback.message,
    });
  };

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
      setError(error.message || "Unable to update feedback.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your feedback? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      await deleteOwnFeedback(feedback._id);

      onFeedbackDeleted(feedback._id);
    } catch (error) {
      console.error(error);
      setError(error.message || "Unable to delete feedback.");
    } finally {
      setIsDeleting(false);
    }
  };

  if (isEditing) {
    return (
      <div className="feedback-card">
        <form onSubmit={handleSave}>
          <div className="mb-3">
            <label
              htmlFor={`edit-name-${feedback._id}`}
              className="form-label"
            >
              Name
            </label>

            <input
              id={`edit-name-${feedback._id}`}
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor={`edit-email-${feedback._id}`}
              className="form-label"
            >
              Email
            </label>

            <input
              id={`edit-email-${feedback._id}`}
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor={`edit-message-${feedback._id}`}
              className="form-label"
            >
              Message
            </label>

            <textarea
              id={`edit-message-${feedback._id}`}
              name="message"
              className="form-control"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-dark btn-sm"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
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

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

      {/* Only the owner can see these buttons */}
      {feedback.isOwner && (
        <div className="mt-3 d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-dark btn-sm"
            onClick={handleEdit}
            disabled={isDeleting}
          >
            Edit
          </button>

          <button
            type="button"
            className="btn btn-outline-danger btn-sm"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
}

export default FeedbackItem;