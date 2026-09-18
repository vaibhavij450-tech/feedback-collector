const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/feedback";

/**
 * Retrieves all feedback records from the server.
 *
 * @returns {Promise<Array>} List of feedback records.
 * @throws {Error} If the request fails.
 */
export const getFeedback = async () => {
  const response = await fetch(API_URL, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch feedback");
  }

  return response.json();
};

/**
 * Submits a new feedback record to the server.
 *
 * @param {Object} feedback - Feedback data to submit.
 * @returns {Promise<Object>} The newly created feedback record.
 * @throws {Error} If the request fails.
 */
export const createFeedback = async (feedback) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(feedback),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to create feedback"
    );
  }

  return data;
};

/**
 * Updates an existing feedback record.
 *
 * The backend verifies that the current customer owns
 * the feedback before allowing the update.
 *
 * @param {string} id - Unique ID of the feedback record.
 * @param {Object} feedback - Updated feedback data.
 * @returns {Promise<Object>} The updated feedback record.
 * @throws {Error} If the request fails.
 */
export const updateFeedback = async (id, feedback) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(feedback),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to update feedback"
    );
  }

  return data;
};

/**
 * Deletes a feedback record from the server.
 *
 * @param {string} id - Unique ID of the feedback record.
 * @returns {Promise<Object>} The server response.
 * @throws {Error} If the request fails.
 */
export const deleteFeedback = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete feedback"
    );
  }

  return data;
};