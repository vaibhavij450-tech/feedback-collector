import FeedbackItem from "./FeedbackItem";

function FeedbackList({
  feedback,
  onFeedbackUpdated,
  onFeedbackDeleted,
}) {
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
          There are no responses matching your current
          filters.
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
          onFeedbackUpdated={onFeedbackUpdated}
          onFeedbackDeleted={onFeedbackDeleted}
        />
      ))}
    </div>
  );
}

export default FeedbackList;