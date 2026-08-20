import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyRegistrations from "./pages/MyRegistrations";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    setIsLoggedIn(false);
    setCurrentPage("dashboard");
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Check logged-in user's role
  const role = localStorage.getItem("role");

  // Admin gets Admin Dashboard
  if (role === "ADMIN") {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  // Student registration page
  if (currentPage === "registrations") {
    return (
      <MyRegistrations
        onBack={() => setCurrentPage("dashboard")}
        onLogout={handleLogout}
      />
    );
  }

  // Student Dashboard
  return (
    <Dashboard
      onMyRegistrations={() => setCurrentPage("registrations")}
      onLogout={handleLogout}
    />
  );
}

export default App;