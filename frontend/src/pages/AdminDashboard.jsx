import { useEffect, useState } from "react";
import {
  getAdminDashboard,
  getAdminEvents,
  getAdminRegistrations,
  createAdminEvent,
  updateAdminEvent,
  deleteAdminEvent,
} from "../services/api";
import "./AdminDashboard.css";

function AdminDashboard({ onLogout }) {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalEvents: 0,
    totalRegistrations: 0,
  });

  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    eventDate: "",
    organizer: "",
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const dashboardData = await getAdminDashboard();
      const eventData = await getAdminEvents();
      const registrationData = await getAdminRegistrations();


      setStats(dashboardData);
      setEvents(eventData);
      setRegistrations(registrationData);

    } catch (error) {
      console.error("Failed to load dashboard:", error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const openCreateForm = () => {
    setEditingEvent(null);

    setForm({
      title: "",
      description: "",
      location: "",
      eventDate: "",
      organizer: "",
    });

    setShowForm(true);
  };

  const openEditForm = (event) => {
    setEditingEvent(event);

    setForm({
      title: event.title,
      description: event.description,
      location: event.location,
      eventDate: event.eventDate,
      organizer: event.organizer,
    });

    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingEvent) {
        await updateAdminEvent(editingEvent.id, form);
      } else {
        await createAdminEvent(form);
      }

      setShowForm(false);
      setEditingEvent(null);

      await loadDashboard();
    } catch (error) {
      console.error("Failed to save event:", error);
      alert("Failed to save event");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmed) return;

    try {
      await deleteAdminEvent(id);
      await loadDashboard();
    } catch (error) {
      console.error("Failed to delete event:", error);
      alert("Failed to delete event");
    }
  };

  return (
    <div className="admin-page">

      {/* HEADER */}

      <header className="admin-header">
        <div className="admin-logo">
          Campus<span>Connect</span>
        </div>

        <div className="admin-header-right">
          <div className="admin-profile">
            <strong>Admin</strong>
            <small>ADMIN</small>
          </div>

          <button
            className="logout-btn"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* MAIN */}

      <main className="admin-container">

        <section className="admin-hero">
          <div>
            <p className="section-label">ADMIN PANEL</p>

            <h1>Admin Dashboard</h1>

            <p>
              Manage campus events, students and registrations
              from one place.
            </p>
          </div>

          <button
            className="create-btn"
            onClick={openCreateForm}
          >
            + Create Event
          </button>
        </section>

        {/* STATISTICS */}

        <section className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon">👨‍🎓</div>

            <div>
              <p>Total Students</p>
              <h2>{stats.totalStudents}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📅</div>

            <div>
              <p>Total Events</p>
              <h2>{stats.totalEvents}</h2>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📝</div>

            <div>
              <p>Total Registrations</p>
              <h2>{stats.totalRegistrations}</h2>
            </div>
          </div>

        </section>

        {/* EVENTS */}

        <section className="events-section">

          <div className="section-heading">
            <div>
              <p className="section-label">MANAGEMENT</p>
              <h2>Campus Events</h2>
            </div>

            <span>
              {events.length} events
            </span>
          </div>

          <div className="events-grid">

            {events.length === 0 ? (

              <div className="empty-state">
                <div>📅</div>
                <h3>No events available</h3>
                <p>Create your first campus event.</p>
              </div>

            ) : (

              events.map((event) => (

                <div
                  className="event-card"
                  key={event.id}
                >

                  <div className="event-card-top">
                    <span className="event-badge">
                      CAMPUS EVENT
                    </span>

                    <span className="event-id">
                      #{event.id}
                    </span>
                  </div>

                  <h3>{event.title}</h3>

                  <p className="event-description">
                    {event.description}
                  </p>

                  <div className="event-details">

                    <div>
                      📍
                      <span>
                        {event.location}
                      </span>
                    </div>

                    <div>
                      🗓️
                      <span>
                        {event.eventDate}
                      </span>
                    </div>

                    <div>
                      👤
                      <span>
                        {event.organizer}
                      </span>
                    </div>

                  </div>

                  <div className="event-actions">

                    <button
                      className="edit-btn"
                      onClick={() =>
                        openEditForm(event)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(event.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </section>
                {/* REGISTRATIONS */}

        <section className="registrations-section">

          <div className="section-heading">
            <div>
              <p className="section-label">MANAGEMENT</p>
              <h2>Student Registrations</h2>
            </div>

            <span>
              {registrations.length} registrations
            </span>
          </div>

          {registrations.length === 0 ? (

            <div className="empty-state">
              <div>📝</div>
              <h3>No registrations yet</h3>
              <p>Students who register for events will appear here.</p>
            </div>

          ) : (

            <div className="registrations-table">

              <div className="registration-row registration-header">
                <span>Student</span>
                <span>Email</span>
                <span>Event</span>
                <span>Location</span>
              </div>

              {registrations.map((registration) => (

                <div
                  className="registration-row"
                  key={registration.id}
                >

                  <span>
                    {registration.student?.name}
                  </span>

                  <span>
                    {registration.student?.email}
                  </span>

                  <span>
                    {registration.event?.title}
                  </span>

                  <span>
                    {registration.event?.location}
                  </span>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

      {/* CREATE / EDIT MODAL */}

      {showForm && (

        <div className="modal-overlay">

          <div className="event-modal">

            <div className="modal-header">

              <div>
                <p className="section-label">
                  {editingEvent
                    ? "EDIT EVENT"
                    : "NEW EVENT"}
                </p>

                <h2>
                  {editingEvent
                    ? "Edit Event"
                    : "Create Event"}
                </h2>
              </div>

              <button
                className="close-btn"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>

            </div>

            <form onSubmit={handleSubmit}>

              <label>
                Event Title
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter event title"
                  required
                />
              </label>

              <label>
                Description
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Describe the event"
                  required
                />
              </label>

              <label>
                Location
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Innovation Center"
                  required
                />
              </label>

              <label>
                Event Date
                <input
                  type="datetime-local"
                  name="eventDate"
                  value={form.eventDate}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Organizer
                <input
                  name="organizer"
                  value={form.organizer}
                  onChange={handleChange}
                  placeholder="e.g. Computer Club"
                  required
                />
              </label>

              <div className="modal-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                >
                  {editingEvent
                    ? "Update Event"
                    : "Create Event"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminDashboard;