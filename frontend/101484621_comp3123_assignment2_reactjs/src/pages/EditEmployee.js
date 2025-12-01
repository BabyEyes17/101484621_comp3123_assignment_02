import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosClient";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [date_of_joining, setDateOfJoining] = useState("");
  const [department, setDepartment] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  const [error, setError] = useState("");

  // Fetch existing employee
  const fetchEmployee = async () => {
    try {
      const res = await api.get(`/emp/employees/${id}`);
      const emp = res.data;

      setFirstName(emp.first_name);
      setLastName(emp.last_name);
      setEmail(emp.email);
      setPosition(emp.position || "");
      setSalary(emp.salary || "");
      setDateOfJoining(emp.date_of_joining?.split("T")[0] || "");
      setDepartment(emp.department || "");

      // Correct backend image field:
      setExistingImage(emp.profileImageUrl || null);

    } catch (err) {
      setError("Failed to load employee data.");
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  // Submit updated employee
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("first_name", first_name);
      form.append("last_name", last_name);
      form.append("email", email);
      form.append("position", position);
      form.append("salary", salary);
      form.append("date_of_joining", date_of_joining);
      form.append("department", department);

      if (newProfileImage) {
        form.append("profileImage", newProfileImage);
      }

      await api.put(`/emp/employees/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/employees");

    } catch (err) {
      setError("Failed to update employee.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Employee</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleUpdate}>

        <input
          type="text"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          required
        /><br/><br/>

        <input
          type="text"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          required
        /><br/><br/>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/><br/>

        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        /><br/><br/>

        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        /><br/><br/>

        <label>Date of Joining:</label><br/>
        <input
          type="date"
          value={date_of_joining}
          onChange={(e) => setDateOfJoining(e.target.value)}
          required
        /><br/><br/>

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        /><br/><br/>

        {/* Existing Image */}
        {existingImage && (
          <div>
            <p>Current Profile Image:</p>
            <img
              src={`${process.env.REACT_APP_API_URL}${existingImage}`}
              alt="Employee"
              width="120"
              height="120"
              style={{ borderRadius: "10px", objectFit: "cover" }}
            />
            <br /><br />
          </div>
        )}

        <label>Upload New Image (optional):</label><br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewProfileImage(e.target.files[0])}
        /><br/><br/>

        <button type="submit">Update Employee</button>

        <button
          type="button"
          style={{ marginLeft: "10px" }}
          onClick={() => navigate("/employees")}
        >
          Cancel
        </button>

      </form>
    </div>
  );
}
