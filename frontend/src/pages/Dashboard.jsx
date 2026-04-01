import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <Navbar logout={logout} />

      <div style={s.container}>
        <h1>📊 Dashboard</h1>

        <button onClick={() => navigate("/policy")} style={s.card}>
          📋 Manage Policy
        </button>

        <button onClick={() => navigate("/claim")} style={s.card}>
          🌧 Simulate Claim
        </button>
      </div>
    </div>
  );
}

const s = {
  container: {
    textAlign: "center",
    marginTop: "50px"
  },
  card: {
    display: "block",
    margin: "20px auto",
    padding: "20px",
    width: "200px",
    background: "#4fc3f7",
    border: "none",
    cursor: "pointer"
  }
};