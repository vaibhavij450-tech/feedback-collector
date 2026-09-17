const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/feedback";
/**
 * Retrieves all feedback records from the server.
 *
 * @returns {Promise<Array>} List of feedback records.
 * @throws {Error} If the request fails.
 */
export const getFeedback = async () => {
  const response = await fetch(API_URL);

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
    body: JSON.stringify(feedback),
  });

  if (!response.ok) {
    throw new Error("Failed to create feedback");
  }

  return response.json();
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
  });

  if (!response.ok) {
    throw new Error("Failed to delete feedback");
  }

  return response.json();
};