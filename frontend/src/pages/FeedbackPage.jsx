import { useMemo, useState } from "react";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";

function FeedbackPage({
  feedback,
  loading,
  error,
  onFeedbackAdded,
  onFeedbackUpdated,
  onFeedbackDeleted,
}) {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const clearFilters = () => {
    setSearch("");
    setDateFilter("");
  };

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
        <div className="feedback-header">
          <div>
            <span className="section-label">
              COMMUNITY NOTES
            </span>

            <h2>
              All
              <br />
              feedback
            </h2>

            <p>
              {filteredFeedback.length} responses
            </p>
          </div>

          <div className="filters">
            <input
              type="text"
              placeholder="Search feedback..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            <input
              type="date"
              value={dateFilter}
              onChange={(event) =>
                setDateFilter(event.target.value)
              }
            />

            <button
              type="button"
              onClick={clearFilters}
            >
              Clear
            </button>
          </div>
        </div>

        {loading && (
          <div className="text-center py-5">
            Loading feedback...
          </div>
        )}

        {error && (
          <div
            className="alert alert-danger"
            role="alert"
          >
            {error}
          </div>
        )}

        {!loading && !error && (
          <FeedbackList
            feedback={filteredFeedback}
            onFeedbackUpdated={onFeedbackUpdated}
            onFeedbackDeleted={onFeedbackDeleted}
          />
        )}
      </section>
    </>
  );
}

export default FeedbackPage;