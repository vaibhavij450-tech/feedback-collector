import { useState } from "react";

/**
 * Renders the feedback submission form.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.onFeedbackAdded - Callback used to submit feedback.
 * @returns {JSX.Element} Feedback form UI.
 */
function FeedbackForm({ onFeedbackAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  /**
   * Updates the corresponding form field.
   *
   * @param {Object} event - Input change event.
   */
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /**
   * Validates and submits the feedback form.
   *
   * @param {Object} event - Form submission event.
   * @returns {Promise<void>} Resolves after submission is completed.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccessMessage("");

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!formData.message.trim()) {
      setError("Please enter your feedback.");
      return;
    }

    try {
      setSubmitting(true);

      await onFeedbackAdded(formData);

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setSuccessMessage(
        "Thanks for sharing! Your feedback has been received."
      );

      // Automatically hide the success message after 4 seconds.
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    } catch (error) {
      console.error(error);
      setError("Unable to submit feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Success notification uses Bootstrap positioning utilities. */}
      {successMessage && (
        <div
          className="success-toast position-fixed top-0 end-0 m-3"
          role="status"
          aria-live="polite"
        >
          <div className="success-toast-icon">
            ✓
          </div>

          <div className="success-toast-content">
            <strong>Feedback received!</strong>

            <span>{successMessage}</span>
          </div>

          <button
            type="button"
            className="success-toast-close"
            onClick={() => setSuccessMessage("")}
            aria-label="Close success message"
          >
            ×
          </button>
        </div>
      )}

      <section className="feedback-form-card">
        <div className="form-heading">
          <span
            className="form-icon"
            aria-hidden="true"
          >
            ◯
          </span>

          <div>
            <span className="form-eyebrow">
              YOUR FEEDBACK
            </span>

            <h2>Share your thoughts</h2>

            <p>
              Every submission is read and taken seriously.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div
              className="form-error alert alert-danger mb-3"
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Bootstrap row and columns provide the responsive form layout. */}
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="name">
                  Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-group">
                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="col-12">
              <div className="form-group">
                <label htmlFor="message">
                  Your feedback
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  className="form-control"
                  placeholder="Tell us what you think..."
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button
            className="submit-button btn"
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "Submitting..."
              : "Submit feedback"}
          </button>
        </form>
      </section>
    </>
  );
}

export default FeedbackForm;