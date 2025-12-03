import { useState } from "react";
import api from "../api/axiosClient";
import { useNavigate } from "react-router-dom";



export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/login", { email, password });

      if (!res.data.status) {
        return setError(res.data.message);
      }

      localStorage.setItem("token", res.data.token);
      navigate("/employees");
    } catch {
      setError("Login failed.");
    }
  };

  return (

  <div className="page-wrapper">
    <div className="card">

      <h2 className="page-title">Login</h2>

      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          className="input-field"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="input-field"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>

      <p style={{ marginTop: "15px" }}>
        Don't have an account?{" "}
        <span
          style={{
            color: "var(--orange)",
            cursor: "pointer",
            fontWeight: "600",
          }}
          onClick={() => navigate("/signup")}
        >
          Sign up
        </span>
      </p>

    </div>
  </div>
  );
}
