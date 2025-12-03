import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import { API_BASE_URL } from "../api/config";

/* Icons */
import SearchIcon from "../assets/magnifying-glass-solid-full.svg";
import ClearIcon from "../assets/delete-left-solid-full.svg";
import AddEmployeeIcon from "../assets/user-plus-solid-full.svg";
import ViewIcon from "../assets/eye-solid-full.svg";
import EditIcon from "../assets/pen-to-square-solid-full.svg";
import DeleteIcon from "../assets/trash-solid-full.svg";

export default function EmployeeList() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState("");

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/emp/employees");
      setEmployees(res.data);
    } catch {
      setError("Failed to fetch employees.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/emp/employees/${id}`);
      fetchEmployees();
    } catch {
      alert("Failed to delete employee.");
    }
  };

  const handleSearch = async () => {
    try {
      const res = await api.get("/emp/employees/search", {
        params: { department, position }
      });
      setEmployees(res.data);
    } catch {
      alert("Search failed.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="page-wrapper">

      {/* Top Bar */}
      <div className="employee-top-row">
        <div className="search-box">
          <input
            className="search-input"
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />

          <input
            className="search-input"
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />

          <button className="btn btn-primary" onClick={handleSearch}>
            <img src={SearchIcon} className="icon" alt="search" /> Search
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => {
              setDepartment("");
              setPosition("");
              fetchEmployees();
            }}
          >
            <img src={ClearIcon} className="icon" alt="clear" />
          </button>
        </div>
      </div>

      {/* Page Title + Add */}
      <div className="employee-header">
        <h2 className="page-title">Employees</h2>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/employees/add")}
        >
          <img src={AddEmployeeIcon} className="icon" alt="add employee" />
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      {/* Employee List */}
      <div className="employee-list">
        {employees.length === 0 ? (
          <p className="no-results">No employees found.</p>
        ) : (
          employees.map((emp) => (
            <div className="employee-row" key={emp._id}>
              {/* LEFT: IMAGE */}
              <div className="employee-img-wrap">
                {emp.profileImageUrl ? (
                  <img
                    className="employee-img"
                    src={`${API_BASE_URL}${emp.profileImageUrl}`}
                    alt="profile"
                  />
                ) : (
                  <div className="employee-img-placeholder">(No Image)</div>
                )}
              </div>

              {/* MIDDLE: INFO */}
              <div className="employee-info">
                <h3>{emp.first_name} {emp.last_name}</h3>
                <p className="employee-id">{emp._id}</p>
                <p>{emp.email}</p>
                <p>{emp.department || "-"}</p>
                <p>{emp.position || "-"}</p>
              </div>

              {/* RIGHT: ACTIONS */}
              <div className="employee-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/employees/${emp._id}`)}
                >
                  <img src={ViewIcon} className="icon" alt="view" />
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => navigate(`/employees/${emp._id}/edit`)}
                >
                  <img src={EditIcon} className="icon" alt="edit" />
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => navigate(`/employees/${emp._id}/delete`)}
                >
                  <img src={DeleteIcon} className="icon" alt="delete" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
