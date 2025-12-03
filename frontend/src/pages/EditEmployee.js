import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosClient";

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
      setExistingImage(emp.profileImageUrl || null);
    } catch {
      setError("Failed to load employee data.");
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

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
    } catch {
      setError("Failed to update employee.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="card-container">

        <h2 className="page-title">Edit Employee</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleUpdate}>

          <input
            className="input-field"
            type="text"
            placeholder="First Name"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />

          <input
            className="input-field"
            type="text"
            placeholder="Last Name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="input-field"
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />

          <input
            className="input-field"
            type="number"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          <label className="input-label">Date of Joining</label>
          <input
            className="input-field"
            type="date"
            value={date_of_joining}
            onChange={(e) => setDateOfJoining(e.target.value)}
            required
          />

          <input
            className="input-field"
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />

          {existingImage && (
            <div className="existing-image-wrap">
              <p className="existing-image-label">Current Profile Image</p>

              <img
                src={`${process.env.REACT_APP_API_URL}${existingImage}`}
                alt="Employee"
                className="existing-image"
              />

              <div className="replace-icon-wrap">
                <img src={ReplaceIcon} className="icon" alt="replace" />
              </div>
            </div>
          )}

          <label className="input-label">Upload New Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewProfileImage(e.target.files[0])}
            className="file-input"
          />

          <div className="button-group">
            <button type="submit" className="btn-primary">
              <img src={SaveIcon} className="icon" alt="save" />
            </button>

            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/employees")}
            >
              <img src={CancelIcon} className="icon" alt="cancel" /> Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
