import { Link } from "react-router-dom";

export default function Navbar({ logout }) {
  return (
    <div style={s.nav}>
      <h2 style={s.logo}>🌧 GigShield</h2>

      <div>
        <Link to="/dashboard" style={s.link}>🏠 Dashboard</Link>
        <Link to="/policy" style={s.link}>📋 Policy</Link>
        <Link to="/claim" style={s.link}>🌧 Claim</Link>
        <button onClick={logout} style={s.btn}>Logout</button>
      </div>
    </div>
  );
}

const s = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 30px",
    background: "#0d1225",
    color: "white"
  },
  logo: { margin: 0 },
  link: {
    marginRight: "15px",
    color: "#4fc3f7",
    textDecoration: "none"
  },
  btn: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer"
  }
};