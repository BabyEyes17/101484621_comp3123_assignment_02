import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/employees" style={styles.logo}>
          Employee Manager
        </Link>
      </div>

      <div style={styles.right}>
        {!token ? (
          <>
            <Link style={styles.link} to="/login">Login</Link>
            <Link style={styles.link} to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <Link style={styles.link} to="/employees">Employees</Link>
            <Link style={styles.link} to="/employees/add">Add Employee</Link>

            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    width: "100%",
    background: "#333",
    padding: "12px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  logo: {
    color: "white",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold",
  },
  left: {},
  right: {
    display: "flex",
    alignItems: "center",
  },
  link: {
    color: "white",
    marginRight: "20px",
    textDecoration: "none",
    fontSize: "16px",
  },
  logoutBtn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};
