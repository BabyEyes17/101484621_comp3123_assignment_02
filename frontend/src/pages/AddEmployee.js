/* Add Employee */

import { useState } from "react";
import api from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

/* Icons */
import AddEmployeeIcon from "../assets/user-plus-solid-full.svg";
import SaveIcon from "../assets/floppy-disk-solid-full.svg";
import CancelIcon from "../assets/ban-solid-full.svg";

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
        headers: { "Content-Type": "multipart/form-data" }
      });

      navigate("/employees");
    } catch {
      setError("Failed to add employee.");
    }
  };

  return (
    <div className="page">
      <div className="card">

        <h2 className="page-title">
          <img src={AddEmployeeIcon} className="icon" alt="add employee" /> 
          Add Employee
        </h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleAdd}>

          {/* First Name */}
          <label className="input-label">First Name</label>
          <input
            className="input-field"
            type="text"
            placeholder="Enter first name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          {/* Last Name */}
          <label className="input-label">Last Name</label>
          <input
            className="input-field"
            type="text"
            placeholder="Enter last name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          {/* Email */}
          <label className="input-label">Email</label>
          <input
            className="input-field"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Position */}
          <label className="input-label">Position</label>
          <input
            className="input-field"
            type="text"
            placeholder="Job position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />

          {/* Salary */}
          <label className="input-label">Salary</label>
          <input
            className="input-field"
            type="number"
            placeholder="Salary amount"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          {/* Date of Joining */}
          <label className="input-label">Date of Joining</label>
          <input
            className="input-field"
            type="date"
            value={date_of_joining}
            onChange={(e) => setDateOfJoining(e.target.value)}
            required
          />

          {/* Department */}
          <label className="input-label">Department</label>
          <input
            className="input-field"
            type="text"
            placeholder="Department name"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />

          {/* Profile Image Upload */}
          <label className="input-label">Profile Image</label>
          <input
            className="input-field file-input"
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />

          {/* Buttons */}
          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              <img src={SaveIcon} className="icon" alt="add employee" />
              Add Employee
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/employees")}
            >
              <img src={CancelIcon} className="icon" alt="cancel" />
              Cancel
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
