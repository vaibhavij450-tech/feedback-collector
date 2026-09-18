import { useMemo, useState } from "react";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";

/**
 * Renders the main feedback page.
 *
 * Handles page-level filtering and presentation.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.feedback - Feedback records.
 * @param {boolean} props.loading - Loading state.
 * @param {string} props.error - Error message.
 * @param {Function} props.onFeedbackAdded - Callback for adding feedback.
 * @param {Function} props.onFeedbackUpdated - Callback for updating feedback.
 * @param {Function} props.onDelete - Callback for deleting feedback.
 * @returns {JSX.Element} Feedback page UI.
 */
function FeedbackPage({
  feedback,
  loading,
  error,
  onFeedbackAdded,
  onFeedbackUpdated,
  onDelete,
}) {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  /**
   * Clears all active filters.
   */
  const clearFilters = () => {
    setSearch("");
    setDateFilter("");
  };

  /**
   * Filters feedback using search text and date.
   */
  const filteredFeedback = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return feedback.filter((item) => {
      const matchesSearch =
        !searchText ||
        item.name.toLowerCase().includes(searchText) ||
        item.email.toLowerCase().includes(searchText) ||
        item.message.toLowerCase().includes(searchText);

      const matchesDate =
        !dateFilter ||
        new Date(item.createdAt)
          .toISOString()
          .slice(0, 10) === dateFilter;

      return matchesSearch && matchesDate;
    });
  }, [feedback, search, dateFilter]);

  return (
    <>
      <FeedbackForm
        onFeedbackAdded={onFeedbackAdded}
      />

      <section className="feedback-section">
        <div className="section-top d-flex flex-column flex-lg-row align-items-lg-end justify-content-between gap-3">
          <div>
            <h2>All feedback</h2>

            <p>
              {filteredFeedback.length}{" "}
              {filteredFeedback.length === 1
                ? "response"
                : "responses"}
            </p>
          </div>

          <div className="filters row g-2 w-100 w-lg-auto">
            {/* Search */}
            <div className="col-12 col-sm">
              <input
                type="text"
                className="form-control"
                placeholder="Search feedback..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                aria-label="Search feedback"
              />
            </div>

            {/* Date filter */}
            <div className="col-12 col-sm-auto date-filter">
              <div className="date-input-wrapper">
                {!dateFilter && (
                  <span className="date-placeholder">
                    Filter by date
                  </span>
                )}

                <input
                  id="date-filter"
                  type="date"
                  className={`form-control ${
                    !dateFilter ? "date-empty" : ""
                  }`}
                  value={dateFilter}
                  onChange={(event) =>
                    setDateFilter(event.target.value)
                  }
                  aria-label="Filter feedback by date"
                />
              </div>
            </div>

            {/* Clear */}
            <div className="col-12 col-sm-auto">
              <button
                type="button"
                className="clear-button btn w-100"
                onClick={clearFilters}
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div
            className="global-error alert alert-danger"
            role="alert"
          >
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading text-center py-5">
            <div
              className="spinner-border"
              role="status"
              aria-label="Loading"
            ></div>

            <p>Loading feedback...</p>
          </div>
        ) : (
          <FeedbackList
            feedback={filteredFeedback}
            onDelete={onDelete}
            onFeedbackUpdated={onFeedbackUpdated}
          />
        )}
      </section>
    </>
  );
}

export default FeedbackPage;