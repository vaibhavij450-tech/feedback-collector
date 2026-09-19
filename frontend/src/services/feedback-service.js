const getApiBaseUrl = () => {
  const hostname = window.location.hostname;

  // When testing from another device on the same Wi-Fi,
  // use the backend running on this laptop.
  if (
    hostname.startsWith("192.168.") ||
    hostname.startsWith("10.") ||
    hostname === "localhost" ||
    hostname === "127.0.0.1"
  ) {
    return `http://${hostname}:5000/api/feedback`;
  }

  // Production: use the Render backend.
  return (
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api/feedback"
  );
};

const API_URL = getApiBaseUrl();

export const getFeedback = async () => {
  const response = await fetch(API_URL, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch feedback");
  }

  return response.json();
};

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

export const deleteOwnFeedback = async (id) => {
  const response = await fetch(`${API_URL}/own/${id}`, {
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