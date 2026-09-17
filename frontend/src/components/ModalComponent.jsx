/**
 * Displays a confirmation modal before deleting a feedback record.
 *
 * @param {Object} props - Component properties.
 * @param {Object|null} props.feedback - Feedback record selected for deletion.
 * @param {Function} props.onCancel - Callback used to cancel deletion.
 * @param {Function} props.onConfirm - Callback used to confirm deletion.
 * @returns {JSX.Element|null} Delete confirmation modal or null.
 */
function ModalComponent({ feedback, onCancel, onConfirm }) {
  if (!feedback) {
    return null;
  }

  /**
   * Handles keyboard interaction with the modal.
   *
   * @param {Object} event - Keyboard event.
   */
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onCancel();
    }
  };

  return (
    <div
      className="modal-overlay d-flex align-items-center justify-content-center"
      role="presentation"
      onKeyDown={handleKeyDown}
    >
      <div
        className="delete-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <div
          className="warning-icon d-flex align-items-center justify-content-center"
          aria-hidden="true"
        >
          !
        </div>

        <div className="modal-content">
          <span className="modal-eyebrow">
            CONFIRM ACTION
          </span>

          <h2 id="delete-modal-title">
            Delete feedback?
          </h2>

          <p id="delete-modal-description">
            Are you sure you want to permanently delete the
            feedback submitted by{" "}
            <strong>{feedback.name}</strong>?
          </p>
        </div>

        <div className="modal-actions d-flex flex-column flex-sm-row gap-2">
          <button
            type="button"
            className="cancel-button btn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="confirm-delete-button btn"
            onClick={onConfirm}
            autoFocus
          >
            Delete feedback
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalComponent;
