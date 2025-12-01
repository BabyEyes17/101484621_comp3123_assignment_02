import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";

export default function EmployeeList() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState("");

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const res = await api.get("/emp/employees");
      setEmployees(res.data);
    } catch (err) {
      setError("Failed to fetch employees.");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await api.delete(`/emp/employees/${id}`);
      fetchEmployees(); // refresh list
    } catch (err) {
      alert("Failed to delete employee.");
    }
  };

  // Handle search
  const handleSearch = async () => {
    try {
      const res = await api.get("/emp/employees/search", {
        params: { department, position }
      });
      setEmployees(res.data);
    } catch (err) {
      alert("Search failed.");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee List</h2>

      {/* Logout button */}
      <button 
        style={{ float: "right", marginBottom: "10px" }} 
        onClick={handleLogout}
      >
        Logout
      </button>

      {/* Search Section */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          type="text"
          placeholder="Search by position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <button onClick={handleSearch}>Search</button>

        <button 
          style={{ marginLeft: "10px" }} 
          onClick={() => {
            setDepartment("");
            setPosition("");
            fetchEmployees();
          }}
        >
          Clear
        </button>
      </div>

      {/* Add Employee */}
      <button onClick={() => navigate("/employees/add")} style={{ marginBottom: "20px" }}>
        Add Employee
      </button>

      {/* Error message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Employee Table */}
      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Date of Joining</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>No employees found.</td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>
                  {emp.profileImageUrl ? (
                    <img 
                        src={`${process.env.REACT_APP_API_URL}${emp.profileImageUrl}`} 
                        alt="profile"
                        width="60"
                        height="60"
                        style={{ borderRadius: "10px", objectFit: "cover" }}
                    />
                    ) : (
                    <span>No Image</span>
                    )}
                </td>

                <td>{emp.first_name} {emp.last_name}</td>
                <td>{emp.email}</td>
                <td>{emp.department || "-"}</td>
                <td>{emp.position || "-"}</td>
                <td>{new Date(emp.date_of_joining).toLocaleDateString()}</td>

                <td>
                  <button onClick={() => navigate(`/employees/${emp._id}`)}>
                    View
                  </button>

                  <button onClick={() => navigate(`/employees/${emp._id}/edit`)} style={{ marginLeft: "5px" }}>
                    Edit
                  </button>

                  <button 
                    onClick={() => handleDelete(emp._id)} 
                    style={{ marginLeft: "5px", color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
}
