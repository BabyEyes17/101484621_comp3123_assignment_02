import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosClient";
import { API_BASE_URL } from "../api/config";

/* Icons */
import EditIcon from "../assets/pen-to-square-solid-full.svg"
import DeleteIcon from "../assets/trash-solid-full.svg"
import BackIcon from "../assets/circle-chevron-left-solid-full.svg"
import UserIcon from "../assets/user-solid-full.svg"



export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

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

  if (!employee) {
    return (
      <div className="page-wrapper">
        <div className="card">
          <h3 style={{ textAlign: "center" }}>Loading...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">

      <div className="card">
        <h2 className="page-title">Employee Details</h2>

        {error && <p className="error-text">{error}</p>}

        <div className="existing-image-wrap">
          {employee.profileImageUrl ? (
            <img
              className="profile-image"
              src={`${API_BASE_URL}${employee.profileImageUrl}`}
              alt="Employee"
            />
          ) : (
            <img src={UserIcon} className="icon" alt="user" />
          )}
        </div>

        <div className="card-container">
          <DetailRow label="Name" value={`${employee.first_name} ${employee.last_name}`} />
          <DetailRow label="Email" value={employee.email} />
          <DetailRow label="Position" value={employee.position || "N/A"} />
          <DetailRow label="Department" value={employee.department || "N/A"} />
          <DetailRow label="Salary" value={employee.salary || "N/A"} />
          <DetailRow
            label="Date of Joining"
            value={new Date(employee.date_of_joining).toLocaleDateString()}
          />
          <DetailRow
            label="Created"
            value={new Date(employee.created_at).toLocaleString()}
          />
          <DetailRow
            label="Last Updated"
            value={new Date(employee.updated_at).toLocaleString()}
          />
        </div>

        <div className="button-group">
          
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/employees")}
          >
            <img src={BackIcon} className="icon" alt="back" />
          </button>

          <button
            className="btn btn-primary"
            onClick={() => navigate(`/employees/${id}/edit`)}
          >
            <img src={EditIcon} className="icon" alt="edit" />
          </button>

          <button
            className="btn btn-danger"
            onClick={() => navigate(`/employees/${employee._id}/delete`)}
          >
            <img src={DeleteIcon} className="icon" alt="delete" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <p style={{ marginBottom: "12px", fontSize: "16px" }}>
      <strong style={{ color: "var(--orange)" }}>{label}:</strong> {value}
    </p>
  );
}
