import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosClient";
import { API_BASE_URL } from "../api/config";

/* Icons */
import DeleteIcon from "../assets/trash-solid-full.svg";
import CancelIcon from "../assets/ban-solid-full.svg";

export default function DeleteEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  // Fetch employee info so user can confirm
  const fetchEmployee = async () => {
    try {
      const res = await api.get(`/emp/employees/${id}`);
      setEmployee(res.data);
    } catch {
      setError("Failed to load employee details.");
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const handleDelete = async () => {
    try {
      await api.delete(`/emp/employees/${id}`);
      navigate("/employees");
    } catch {
      setError("Failed to delete employee.");
    }
  };

  if (!employee) return <div className="page-wrapper">Loading...</div>;

  return (
    <div className="page-wrapper">
      <div className="card">

        <h2 className="page-title">
          <img src={DeleteIcon} className="icon" alt="delete" />
          Delete Employee
        </h2>

        {error && <p className="error-text">{error}</p>}

        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Are you sure you want to delete:
        </p>

        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <strong>{employee.first_name} {employee.last_name}</strong>
          <br />
          <span style={{ color: "var(--text-light)" }}>{employee.email}</span>

          {employee.profileImageUrl && (
            <div style={{ marginTop: "15px" }}>
              <img
                src={`${API_BASE_URL}${employee.profileImageUrl}`}
                alt="profile"
                className="profile-image"
              />
            </div>
          )}
        </div>

        <div className="button-group" style={{ textAlign: "center" }}>
          <button className="btn btn-danger" onClick={handleDelete}>
            <img src={DeleteIcon} className="icon" alt="delete" /> Delete
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => navigate(`/employees/${id}`)}
          >
            <img src={CancelIcon} className="icon" alt="cancel" /> Cancel
          </button>
        </div>

      </div>
    </div>
  );
}
