import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/login", { email, password });
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div style={s.bg}>
      <div style={s.card}>
        <h1 style={s.title}>🌧 GigShield AI</h1>
        <p style={s.subtitle}>Protect Your Income Smartly</p>

        <input
          style={s.input}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={s.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={s.button} onClick={handleLogin}>
          Login →
        </button>
      </div>
    </div>
  );
}

const s = {
  bg: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e3a8a)"
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(20px)",
    padding: "40px",
    borderRadius: "15px",
    textAlign: "center",
    width: "300px",
    color: "white",
    boxShadow: "0 0 30px rgba(0,0,0,0.3)"
  },
  title: {
    marginBottom: "10px"
  },
  subtitle: {
    fontSize: "14px",
    marginBottom: "20px",
    color: "#cbd5f5"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "none"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px"
  }
};