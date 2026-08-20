import { useEffect, useState } from "react";
import { getMyRegistrations } from "../services/api";

function MyRegistrations({ onBack, onLogout }) {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const email = localStorage.getItem("email");

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = async () => {
    try {
      setLoading(true);
      setMessage("");

      const data = await getMyRegistrations();

      console.log("My registrations:", data);

      setRegistrations(data);

    } catch (error) {
      console.error("Failed to load registrations:", error);

      setMessage("Failed to load registrations");

    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    window.location.href = "/";
  };

  return (
    <div className="dashboard">

      {/* NAVBAR */}

      <nav className="navbar">

        <div className="navbar-brand">
            Campus<span>Connect</span>
        </div>

        <div className="navbar-user">

            <div className="user-info">

            <strong>
                {email?.split("@")[0]}
            </strong>

            <span>
                {localStorage.getItem("role")}
            </span>

            </div>

            <button
            className="logout-button"
            onClick={onBack}
            >
            Dashboard
            </button>

            <button
            className="logout-button"
            onClick={onLogout}
            >
            Logout
            </button>

        </div>

        </nav>
      {/* MAIN */}

      <main className="dashboard-content">

        <section className="welcome-section">

          <p className="welcome-label">
            CAMPUS EVENTS
          </p>

          <h1>
            My Registrations
          </h1>

          <p className="welcome-description">
            View all the campus events you have registered for.
          </p>

        </section>

        {/* ERROR */}

        {message && (
          <div className="message">
            {message}
          </div>
        )}

        {/* LOADING */}

        {loading ? (

          <div className="loading">

            <div className="spinner"></div>

            <p>
              Loading your registrations...
            </p>

          </div>

        ) : registrations.length === 0 ? (

          /* EMPTY STATE */

          <div className="empty-state">

            <div className="empty-icon">
              📅
            </div>

            <h3>
              No registrations yet
            </h3>

            <p>
              You haven't registered for any campus events yet.
            </p>

          </div>

        ) : (

          /* REGISTRATION CARDS */

          <section className="events-section">

            <div className="section-header">

              <div>

                <p className="section-label">
                  YOUR EVENTS
                </p>

                <h2>
                  Registered Events
                </h2>

              </div>

              <span className="event-count">
                {registrations.length} event
                {registrations.length !== 1 ? "s" : ""}
              </span>

            </div>

            <div className="events-grid">

              {registrations.map((registration) => (

                <article
                  className="event-card"
                  key={registration.id}
                >

                  <div className="event-card-top">

                    <span className="event-badge">
                      REGISTERED EVENT
                    </span>

                    <span className="event-id">
                      #{registration.eventId}
                    </span>

                  </div>

                  <div className="event-card-content">

                    <h3>
                      {registration.title}
                    </h3>

                    <p className="event-description">
                      {registration.description}
                    </p>

                    <div className="event-details">

                      <div className="event-detail">

                        <span className="detail-icon">
                          📍
                        </span>

                        <div>

                          <small>
                            Location
                          </small>

                          <p>
                            {registration.location}
                          </p>

                        </div>

                      </div>

                      <div className="event-detail">

                        <span className="detail-icon">
                          📅
                        </span>

                        <div>

                          <small>
                            Date & Time
                          </small>

                          <p>
                            {new Date(
                              registration.eventDate
                            ).toLocaleString()}
                          </p>

                        </div>

                      </div>

                      <div className="event-detail">

                        <span className="detail-icon">
                          👤
                        </span>

                        <div>

                          <small>
                            Organizer
                          </small>

                          <p>
                            {registration.organizer}
                          </p>

                        </div>

                      </div>

                      <div className="event-detail">

                        <span className="detail-icon">
                          🕒
                        </span>

                        <div>

                          <small>
                            Registered On
                          </small>

                          <p>
                            {new Date(
                              registration.registeredAt
                            ).toLocaleString()}
                          </p>

                        </div>

                      </div>

                    </div>

                    <button
                      className="register-button registered"
                      disabled
                    >
                      ✓ Registered
                    </button>

                  </div>

                </article>

              ))}

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default MyRegistrations;