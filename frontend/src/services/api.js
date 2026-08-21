const API_URL = "https://campusconnect-1dv9.onrender.com";

const getToken = () => {
  return localStorage.getItem("token");
};

// Common request function
const request = async (url, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Add JWT if available
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed: ${response.status}`);
  }

  // Handle empty response
  if (response.status === 204) {
    return null;
  }

  // Check response type
  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  // For plain text responses
  return response.text();
};

// ====================
// AUTH
// ====================

export const login = async (email, password) => {
  const data = await request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  // Save login information
  localStorage.setItem("token", data.token);
  localStorage.setItem("email", data.email);
  localStorage.setItem("role", data.role);

  return data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
};

// ====================
// EVENTS
// ====================

export const getEvents = async () => {
  return request("/api/events");
};

export const getEvent = async (eventId) => {
  return request(`/api/events/${eventId}`);
};

// Register current user for event
export const registerForEvent = async (eventId) => {
  return request(`/api/events/${eventId}/register`, {
    method: "POST",
  });
};

// Get registration count
export const getRegistrationCount = async (eventId) => {
  return request(`/api/events/${eventId}/registrations/count`);
};

// Get current user's registrations
export const getMyRegistrations = async () => {
  return request("/api/events/my-registrations");
};

// ====================
// ADMIN
// ====================

// Get admin dashboard statistics
export const getAdminDashboard = async () => {
  return request("/api/admin/dashboard");
};

// Get all events for admin
export const getAdminEvents = async () => {
  return request("/api/admin/events");
};

// Create a new event
export const createAdminEvent = async (event) => {
  return request("/api/admin/events", {
    method: "POST",
    body: JSON.stringify(event),
  });
};

// Update an event
export const updateAdminEvent = async (eventId, event) => {
  return request(`/api/admin/events/${eventId}`, {
    method: "PUT",
    body: JSON.stringify(event),
  });
};

// Delete an event
export const deleteAdminEvent = async (eventId) => {
  return request(`/api/admin/events/${eventId}`, {
    method: "DELETE",
  });
};

export const getAdminRegistrations = async () => {
  return request("/api/admin/registrations");
};