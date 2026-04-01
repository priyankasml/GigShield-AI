import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const nav = useNavigate();

  return (
    <div style={s.sidebar}>
      <h2 style={s.logo}>🌧 GigShield</h2>

      <div style={s.menu}>
        <p onClick={()=>nav("/dashboard")}>🏠 Dashboard</p>
        <p onClick={()=>nav("/policy")}>📋 Policy</p>
        <p onClick={()=>nav("/claim")}>🌧 Claims</p>
      </div>
    </div>
  );
}

const s = {
  sidebar: {
    width: "200px",
    height: "100vh",
    background: "#0f172a",
    padding: "20px",
    position: "fixed"
  },
  logo: {
    color: "#4fc3f7"
  },
  menu: {
    marginTop: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    cursor: "pointer"
  }
};