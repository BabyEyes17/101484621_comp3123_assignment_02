import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosClient";

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  const fetchEmployee = async () => {
    try {
      const res = await api.get(`/emp/employees/${id}`);
      setEmployee(res.data);
    } catch (err) {
      setError("Failed to load employee details.");
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  if (!employee) {
    return <div style={{ padding: "20px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Details</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Profile Image */}
      {employee.profileImageUrl && (
        <img
          src={`http://localhost:3000${employee.profileImageUrl}`}
          alt="Employee"
          width="150"
          height="150"
          style={{ borderRadius: "10px", objectFit: "cover", marginBottom: "20px" }}
        />
      )}

      <p><strong>Name:</strong> {employee.first_name} {employee.last_name}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Position:</strong> {employee.position || "N/A"}</p>
      <p><strong>Department:</strong> {employee.department || "N/A"}</p>
      <p><strong>Salary:</strong> {employee.salary || "N/A"}</p>
      <p><strong>Date of Joining:</strong> {new Date(employee.date_of_joining).toLocaleDateString()}</p>
      <p><strong>Created:</strong> {new Date(employee.created_at).toLocaleString()}</p>
      <p><strong>Last Updated:</strong> {new Date(employee.updated_at).toLocaleString()}</p>

      <br />

      <button onClick={() => navigate(`/employees/${id}/edit`)}>Edit</button>
      <button 
        style={{ marginLeft: "10px" }} 
        onClick={() => navigate("/employees")}
      >
        Back
      </button>
    </div>
  );
}
