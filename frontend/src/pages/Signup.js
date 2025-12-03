import { useState } from "react";
import api from "../api/axiosClient";
import { useNavigate } from "react-router-dom";



export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/signup", {
        username,
        email,
        password,
      });

      if (!res.data.status) {
        return setError(res.data.message);
      }

      navigate("/login");
    } catch {
      setError("Signup failed.");
    }
  };

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="card">

          <h2 className="page-title">Create Account</h2>

          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleSignup}>
            <input
              className="input-field"
              type="text"
              placeholder="Choose a username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              className="input-field"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="input-field"
              type="password"
              placeholder="Create a password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className="btn btn-primary" type="submit">
              Signup
            </button>
          </form>

          <p style={{ marginTop: "15px" }}>
            Already have an account?{" "}
            <span
              style={{
                color: "var(--orange)",
                cursor: "pointer",
                fontWeight: "600",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}
