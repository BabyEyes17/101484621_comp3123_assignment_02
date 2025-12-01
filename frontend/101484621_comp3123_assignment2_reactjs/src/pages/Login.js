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

    } catch (err) {
      setError("Login failed.");
    }
  };

  return (
    <div className="page">
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>

        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
        />


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?{" "}
        <span onClick={() => navigate("/signup")} style={{ color: "blue", cursor: "pointer" }}>
          Sign up
        </span>
      </p>
    </div>
  );
}
