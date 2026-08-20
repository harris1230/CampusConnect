import { useEffect, useState } from "react";
import {
  getEvents,
  registerForEvent,
  getRegistrationCount,
  getMyRegistrations,
} from "../services/api";

function Dashboard({ onMyRegistrations, onLogout }) {
  const [events, setEvents] = useState([]);
  const [counts, setCounts] = useState({});
  const [registeredEvents, setRegisteredEvents] = useState(new Set());

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [registering, setRegistering] = useState(null);

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setMessage("");

      // Load events
      const eventData = await getEvents();
      setEvents(eventData);

      // Load user's registrations
      try {
        const registrations = await getMyRegistrations();

        console.log(
            "My registrations:",
            JSON.stringify(registrations, null, 2)
        );

        const registeredIds = new Set(
            registrations
            .map((registration) => registration.eventId)
            .filter((id) => id != null)
        );

        console.log(
            "Registered event IDs:",
            [...registeredIds]
        );

        setRegisteredEvents(registeredIds);

        } catch (error) {

        console.error(
            "Failed to load registrations:",
            error
        );

        setMessage(
            "Failed to load your registrations"
        );
       }

      // Load registration counts
      const countData = {};

      for (const event of eventData) {
        try {
          const count = await getRegistrationCount(event.id);

          countData[event.id] = count;
        } catch (error) {
          console.error(
            `Failed to get count for event ${event.id}`,
            error
          );
        }
      }

      setCounts(countData);

    } catch (error) {
      console.error("Failed to load events:", error);

      setMessage("Failed to load events");

    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId) => {
    try {
      setRegistering(eventId);
      setMessage("");

      await registerForEvent(eventId);

      // Mark event as registered
      setRegisteredEvents((previous) => {
        const updated = new Set(previous);

        updated.add(eventId);

        return updated;
      });

      // Update registration count
      const count = await getRegistrationCount(eventId);

      setCounts((previous) => ({
        ...previous,
        [eventId]: count,
      }));

      setMessage(
        "Successfully registered for the event!"
      );

    } catch (error) {
      console.error("Registration error:", error);

      setMessage(
        error.message ||
          "Failed to register for event"
      );

    } finally {
      setRegistering(null);
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
                {role}
            </span>

            </div>

            <button
            className="logout-button"
            onClick={onMyRegistrations}
            >
            My Registrations
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

        {/* WELCOME */}

        <section className="welcome-section">

          <p className="welcome-label">
            CAMPUS EVENTS
          </p>

          <h1>
            Welcome back,{" "}
            {email?.split("@")[0]} 👋
          </h1>

          <p className="welcome-description">
            Discover exciting events happening around
            your campus and register for the ones you love.
          </p>

        </section>

        {/* MESSAGE */}

        {message && (
          <div className="message">
            {message}
          </div>
        )}

        {/* EVENTS */}

        <section className="events-section">

          <div className="section-header">

            <div>

              <p className="section-label">
                EXPLORE
              </p>

              <h2>
                Upcoming Events
              </h2>

            </div>

            <span className="event-count">

              {events.length} event
              {events.length !== 1 ? "s" : ""}

            </span>

          </div>

          {/* LOADING */}

          {loading ? (

            <div className="loading">

              <div className="spinner"></div>

              <p>
                Loading events...
              </p>

            </div>

          ) : events.length === 0 ? (

            /* EMPTY */

            <div className="empty-state">

              <div className="empty-icon">
                📅
              </div>

              <h3>
                No events available
              </h3>

              <p>
                Check back later for upcoming campus events.
              </p>

            </div>

          ) : (

            /* EVENT CARDS */

            <div className="events-grid">

              {events.map((event) => {

                const isRegistered =
                  registeredEvents.has(event.id);

                const isRegistering =
                  registering === event.id;

                return (
                  <article
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

                    <div className="event-card-content">

                      <h3>
                        {event.title}
                      </h3>

                      <p className="event-description">
                        {event.description}
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
                              {event.location}
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
                                event.eventDate
                              ).toLocaleString()}
                            </p>

                          </div>

                        </div>

                        <div className="event-detail">

                          <span className="detail-icon">
                            👥
                          </span>

                          <div>

                            <small>
                              Participants
                            </small>

                            <p>
                              {counts[event.id] ?? 0}
                              {" "}registered
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
                              {event.organizer}
                            </p>

                          </div>

                        </div>

                      </div>

                      {/* REGISTER BUTTON */}

                      <button
                        className={
                          isRegistered
                            ? "register-button registered"
                            : "register-button"
                        }
                        disabled={
                          isRegistered ||
                          isRegistering
                        }
                        onClick={() =>
                          handleRegister(event.id)
                        }
                      >

                        {isRegistered
                          ? "✓ Registered"
                          : isRegistering
                          ? "Registering..."
                          : "Register for Event →"}

                      </button>

                    </div>

                  </article>
                );
              })}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default Dashboard;