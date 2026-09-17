/**
 * Displays a single feedback record.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.feedback - Feedback record to display.
 * @param {Function} props.onDelete - Callback used to request deletion.
 * @returns {JSX.Element} Feedback item UI.
 */
function FeedbackItem({ feedback, onDelete }) {
  // Convert the database timestamp into a readable local date and time.
  const formattedDate = new Date(
    feedback.createdAt
  ).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // Get the first letter of the user's name for the avatar.
  const initial = feedback.name
    ? feedback.name.charAt(0).toUpperCase()
    : "?";

  return (
    <article className="feedback-item p-3 p-md-4">
      <div className="feedback-item-top d-flex align-items-start justify-content-between gap-3">
        <div className="user-info d-flex align-items-center gap-3">
          <div
            className="avatar flex-shrink-0"
            aria-hidden="true"
          >
            {initial}
          </div>

          <div>
            <h3>{feedback.name}</h3>
            <p>{feedback.email}</p>
          </div>
        </div>

        <button
          type="button"
          className="delete-button flex-shrink-0"
          onClick={() => onDelete(feedback)}
          aria-label={`Delete feedback from ${feedback.name}`}
          title="Delete feedback"
        >
          <svg
            className="delete-icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M4 7H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="M9 7V5C9 4.44772 9.44772 4 10 4H14C14.5523 4 15 4.44772 15 5V7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="M7 7L8 19C8.0479 19.5708 8.52669 20 9.1 20H14.9C15.4733 20 15.9521 19.5708 16 19L17 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M10 11V16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="M14 11V16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <p className="feedback-message">
        {feedback.message}
      </p>

      <div className="feedback-date">
        Submitted on {formattedDate}
      </div>
    </article>
  );
}

export default FeedbackItem;