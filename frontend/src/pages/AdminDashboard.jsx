import { useEffect, useMemo, useState } from "react";

import {
  getFeedback,
  deleteFeedback,
} from "../services/feedback-service";

import { logoutAdmin } from "../services/auth-service";

/**
 * Displays the administrator feedback dashboard.
 *
 * Administrators can view, search, filter, and delete
 * customer feedback records.
 *
 * @returns {JSX.Element} Administrator dashboard.
 */
function AdminDashboard() {
  const [feedback, setFeedback] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  /**
   * Loads all feedback records from the backend.
   *
   * @returns {Promise<void>} Resolves after feedback is loaded.
   */
  const loadFeedback = async () => {
    try {
      setError("");

      const data = await getFeedback();

      setFeedback(data);
    } catch (error) {
      console.error("Unable to load feedback:", error);
      setError("Unable to load feedback.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  /**
   * Filters feedback using the entered keyword and selected date.
   *
   * @returns {Array} Filtered feedback records.
   */
  const filteredFeedback = useMemo(() => {
    return feedback.filter((item) => {
      const keyword = searchKeyword.toLowerCase().trim();

      const matchesKeyword =
        !keyword ||
        item.name?.toLowerCase().includes(keyword) ||
        item.email?.toLowerCase().includes(keyword) ||
        item.message?.toLowerCase().includes(keyword);

      const itemDate = item.createdAt
        ? new Date(item.createdAt).toISOString().split("T")[0]
        : "";

      const matchesDate =
        !selectedDate || itemDate === selectedDate;

      return matchesKeyword && matchesDate;
    });
  }, [feedback, searchKeyword, selectedDate]);

  /**
   * Opens the delete confirmation modal.
   *
   * @param {Object} item - Feedback selected for deletion.
   */
  const handleDeleteRequest = (item) => {
    setSelectedFeedback(item);
  };

  /**
   * Deletes the selected feedback after confirmation.
   *
   * @returns {Promise<void>} Resolves after deletion.
   */
  const handleDelete = async () => {
    if (!selectedFeedback) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this feedback?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteFeedback(selectedFeedback._id);

      setFeedback((previous) =>
        previous.filter(
          (item) => item._id !== selectedFeedback._id
        )
      );

      setSelectedFeedback(null);
    } catch (error) {
      console.error("Unable to delete feedback:", error);
      setError("Unable to delete feedback.");
    }
  };

  /**
   * Logs the administrator out of the application.
   *
   * The backend clears the HTTP-only JWT cookie.
   *
   * @returns {Promise<void>} Resolves after logout.
   */
  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    try {
      setIsLoggingOut(true);

      await logoutAdmin();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      window.location.href = "/admin/login";
    }
  };

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-content">
          <div className="d-flex justify-content-between align-items-center gap-3 mb-4">
            <span className="badge">
              ADMIN DASHBOARD
            </span>

            <button
              type="button"
              className="btn btn-light"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut
                ? "Logging out..."
                : "Logout"}
            </button>
          </div>

          <h1>
            Feedback <span>overview.</span>
          </h1>

          <p>
            Review, search, filter, and manage customer
            feedback from one place.
          </p>
        </div>
      </header>

      <main className="container py-5">
        <section className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="row g-3">
              <div className="col-12 col-md-7">
                <label
                  htmlFor="feedback-search"
                  className="form-label"
                >
                  Search feedback
                </label>

                <input
                  id="feedback-search"
                  type="search"
                  className="form-control"
                  placeholder="Search by name, email, or message"
                  value={searchKeyword}
                  onChange={(event) =>
                    setSearchKeyword(event.target.value)
                  }
                />
              </div>

              <div className="col-12 col-md-5">
                <label
                  htmlFor="feedback-date"
                  className="form-label"
                >
                  Filter by date
                </label>

                <input
                  id="feedback-date"
                  type="date"
                  className="form-control"
                  value={selectedDate}
                  onChange={(event) =>
                    setSelectedDate(event.target.value)
                  }
                />
              </div>
            </div>
          </div>
        </section>

        {error && (
          <div
            className="alert alert-danger"
            role="alert"
          >
            {error}
          </div>
        )}

        <section className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="h4 mb-1">
                  Feedback entries
                </h2>

                <p className="text-muted mb-0">
                  {filteredFeedback.length}{" "}
                  {filteredFeedback.length === 1
                    ? "entry"
                    : "entries"}{" "}
                  found
                </p>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-5">
                <div
                  className="spinner-border"
                  role="status"
                  aria-label="Loading feedback"
                />
              </div>
            ) : filteredFeedback.length === 0 ? (
              <div className="text-center py-5">
                <h3 className="h5">
                  No feedback found
                </h3>

                <p className="text-muted mb-0">
                  Try changing your search or date
                  filter.
                </p>
              </div>
            ) : (
              <div className="row g-4">
                {filteredFeedback.map((item) => (
                  <div
                    className="col-12 col-lg-6"
                    key={item._id}
                  >
                    <article className="border rounded-3 p-4 h-100">
                      <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                        <div>
                          <h3 className="h5 mb-1">
                            {item.name}
                          </h3>

                          <p className="text-muted small mb-0">
                            {item.email}
                          </p>
                        </div>

                        <span className="badge text-bg-light">
                          {item.createdAt
                            ? new Date(
                                item.createdAt
                              ).toLocaleDateString()
                            : "Unknown date"}
                        </span>
                      </div>

                      <p className="mb-4">
                        {item.message}
                      </p>

                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          handleDeleteRequest(item)
                        }
                      >
                        Delete feedback
                      </button>
                    </article>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      {selectedFeedback && (
        <div
          className="modal d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header">
                <h2 className="modal-title h5">
                  Delete feedback?
                </h2>

                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() =>
                    setSelectedFeedback(null)
                  }
                />
              </div>

              <div className="modal-body">
                <p className="mb-2">
                  You are about to delete feedback
                  from:
                </p>

                <strong>
                  {selectedFeedback.name}
                </strong>

                <p className="text-muted mt-2 mb-0">
                  This action cannot be undone.
                </p>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    setSelectedFeedback(null)
                  }
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;