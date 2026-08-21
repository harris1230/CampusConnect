import { useState } from "react";
import { login } from "../services/api";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await login(email, password);

      console.log("Login response:", data);

      if (onLogin) {
        onLogin(data);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Left side */}
      <div className="login-brand">
        <div className="brand-content">
          <div className="brand-logo">
            <span>C</span>
          </div>

          <h1>
            Campus<span>Connect</span>
          </h1>

          <p className="brand-tagline">
            Your campus. Your events. Your community.
          </p>

          <div className="brand-features">
            <div className="feature">
              <div className="feature-icon">📅</div>
              <div>
                <strong>Discover Events</strong>
                <p>Find exciting events happening on campus.</p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">🎓</div>
              <div>
                <strong>Connect with Students</strong>
                <p>Stay connected with your campus community.</p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">✨</div>
              <div>
                <strong>Make Memories</strong>
                <p>Register and participate in amazing events.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="login-section">
        <div className="login-card">
          <div className="mobile-logo">
            <div className="brand-logo">
              <span>C</span>
            </div>

            <h1>
              Campus<span>Connect</span>
            </h1>
          </div>

          <div className="login-header">
            <p className="welcome-label">WELCOME BACK</p>

            <h2>Sign in to your account</h2>

            <p>
              Enter your credentials to continue to CampusConnect.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>

              <div className="input-wrapper">
                <span className="input-icon">✉</span>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <div className="input-wrapper">
                <span className="input-icon">🔒</span>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <div className="login-error">
                <span>⚠</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <span className="arrow">→</span>
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <span>CampusConnect</span>
            <span>•</span>
            <span>Campus Events Platform</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;