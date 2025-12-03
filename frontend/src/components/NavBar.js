import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

/* Icons */
import AddEmployeeIcon from "../assets/user-plus-solid-full.svg";
import SaveIcon from "../assets/floppy-disk-solid-full.svg";
import CancelIcon from "../assets/ban-solid-full.svg";
import LogoutIcon from "../assets/right-from-bracket-solid-full.svg";
import HomeIcon from "../assets/user-plus-solid-full.svg";
import LoginIcon from "../assets/floppy-disk-solid-full.svg";
import SignUpIcon from "../assets/ban-solid-full.svg";
import SearchIcon from "../assets/magnifying-glass-solid-full.svg"
import ClearIcon from "../assets/delete-left-solid-full.svg"
import ViewIcon from "../assets/eye-solid-full.svg"
import EditIcon from "../assets/pen-to-square-solid-full.svg"
import DeleteIcon from "../assets/trash-solid-full.svg"
import ReplaceIcon from "../assets/repeat-solid-full.svg";



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
              <Link className="nav-link" to="/employees">Employees</Link>
              <Link className="nav-link" to="/employees/add">Add Employee</Link>

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
