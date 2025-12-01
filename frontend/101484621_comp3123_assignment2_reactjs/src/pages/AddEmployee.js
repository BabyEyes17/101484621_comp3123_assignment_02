import { useState } from "react";
import api from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const navigate = useNavigate();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [date_of_joining, setDateOfJoining] = useState("");
  const [department, setDepartment] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const [error, setError] = useState("");

  const handleAdd = async (e) => {
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

      if (profileImage) {
        form.append("profileImage", profileImage);
      }

      await api.post("/emp/employees", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/employees");
    } catch (err) {
      setError("Failed to add employee.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Employee</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleAdd}>

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

        <label>Profile Image:</label><br/>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfileImage(e.target.files[0])}
        /><br/><br/>

        <button type="submit">Add Employee</button>
        <button type="button" style={{ marginLeft: "10px" }} onClick={() => navigate("/employees")}>
          Cancel
        </button>
      </form>
    </div>
  );
}
