import { useState } from "react";
import { login, registerUser } from "../services/api";
import "./Login.css";

function Login({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

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

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      await registerUser(name, email, password);

      setSuccess(
        "Account created successfully! You can now sign in."
      );

      // Clear registration fields
      setName("");
      setPassword("");

      // Switch back to login after successful registration
      setTimeout(() => {
        setIsRegistering(false);
        setSuccess("");
      }, 1500);
    } catch (err) {
      console.error("Registration error:", err);

      setError(
        err.message || "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsRegistering(!isRegistering);
    setError("");
    setSuccess("");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-page">

      {/* =========================
          LEFT BRAND SECTION
      ========================= */}

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
                <p>
                  Find exciting events happening on campus.
                </p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">🎓</div>

              <div>
                <strong>Connect with Students</strong>
                <p>
                  Stay connected with your campus community.
                </p>
              </div>
            </div>

            <div className="feature">
              <div className="feature-icon">✨</div>

              <div>
                <strong>Make Memories</strong>
                <p>
                  Register and participate in amazing events.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* =========================
          RIGHT LOGIN / REGISTER
      ========================= */}

      <div className="login-section">

        <div className="login-card">

          {/* Mobile logo */}

          <div className="mobile-logo">

            <div className="brand-logo">
              <span>C</span>
            </div>

            <h1>
              Campus<span>Connect</span>
            </h1>

          </div>

          {/* =========================
              LOGIN
          ========================= */}

          {!isRegistering ? (
            <>
              <div className="login-header">

                <p className="welcome-label">
                  WELCOME BACK
                </p>

                <h2>
                  Sign in to your account
                </h2>

                <p>
                  Enter your credentials to continue
                  to CampusConnect.
                </p>

              </div>

              <form onSubmit={handleLogin}>

                <div className="form-group">

                  <label htmlFor="email">
                    Email address
                  </label>

                  <div className="input-wrapper">

                    <span className="input-icon">
                      ✉
                    </span>

                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      autoComplete="email"
                    />

                  </div>
                </div>

                <div className="form-group">

                  <label htmlFor="password">
                    Password
                  </label>

                  <div className="input-wrapper">

                    <span className="input-icon">
                      🔒
                    </span>

                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
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
                      <span className="arrow">
                        →
                      </span>
                    </>
                  )}
                </button>

              </form>

              <div className="auth-switch">

                <span>
                  Don't have an account?
                </span>

                <button
                  type="button"
                  onClick={switchMode}
                >
                  Create Account
                </button>

              </div>
            </>
          ) : (

            /* =========================
               REGISTER
            ========================= */

            <>
              <div className="login-header">

                <p className="welcome-label">
                  JOIN CAMPUSCONNECT
                </p>

                <h2>
                  Create your account
                </h2>

                <p>
                  Join your campus community and
                  discover exciting events.
                </p>

              </div>

              <form onSubmit={handleRegister}>

                <div className="form-group">

                  <label htmlFor="name">
                    Full name
                  </label>

                  <div className="input-wrapper">

                    <span className="input-icon">
                      👤
                    </span>

                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      autoComplete="name"
                    />

                  </div>
                </div>

                <div className="form-group">

                  <label htmlFor="register-email">
                    Email address
                  </label>

                  <div className="input-wrapper">

                    <span className="input-icon">
                      ✉
                    </span>

                    <input
                      id="register-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      autoComplete="email"
                    />

                  </div>
                </div>

                <div className="form-group">

                  <label htmlFor="register-password">
                    Password
                  </label>

                  <div className="input-wrapper">

                    <span className="input-icon">
                      🔒
                    </span>

                    <input
                      id="register-password"
                      type="password"
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      autoComplete="new-password"
                    />

                  </div>

                  <small className="password-hint">
                    Minimum 6 characters
                  </small>

                </div>

                {error && (
                  <div className="login-error">
                    <span>⚠</span>
                    {error}
                  </div>
                )}

                {success && (
                  <div className="login-success">
                    <span>✓</span>
                    {success}
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
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <span className="arrow">
                        →
                      </span>
                    </>
                  )}
                </button>

              </form>

              <div className="auth-switch">

                <span>
                  Already have an account?
                </span>

                <button
                  type="button"
                  onClick={switchMode}
                >
                  Sign In
                </button>

              </div>
            </>
          )}

          <div className="login-footer">

            <span>CampusConnect</span>
            <span>•</span>
            <span>
              Campus Events Platform
            </span>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;