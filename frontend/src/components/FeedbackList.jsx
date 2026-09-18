import FeedbackItem from "./FeedbackItem";

/**
 * Displays a list of feedback records or an empty state.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.feedback - Feedback records to display.
 * @param {Function} props.onDelete - Callback used to request deletion.
 * @param {Function} props.onFeedbackUpdated - Callback used after feedback is edited.
 * @returns {JSX.Element} Feedback list or empty-state UI.
 */
function FeedbackList({
  feedback,
  onDelete,
  onFeedbackUpdated,
}) {
  // Display a styled empty state when no feedback matches the filters.
  if (feedback.length === 0) {
    return (
      <div className="empty-state text-center py-5">
        <div
          className="empty-icon"
          aria-hidden="true"
        >
          💬
        </div>

        <h3>No feedback found</h3>

        <p>
          There are no responses matching your current filters.
        </p>
      </div>
    );
  }

  return (
    <div className="feedback-list d-flex flex-column gap-3">
      {feedback.map((item) => (
        <FeedbackItem
          key={item._id}
          feedback={item}
          onDelete={onDelete}
          onFeedbackUpdated={onFeedbackUpdated}
        />
      ))}
    </div>
  );
}

export default FeedbackList;