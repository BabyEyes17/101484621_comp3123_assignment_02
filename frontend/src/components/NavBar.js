import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored !== token) setToken(stored);
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="container nav-inner">

        <Link to="/employees" className="nav-logo">
          Employee Manager
        </Link>

        <div className="nav-links">
          {!token ? (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/signup">Signup</Link>
            </>
          ) : (
            <>
              <button className="nav-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </nav>

  );
}
