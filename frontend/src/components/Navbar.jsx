import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const workerLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "My Claims",  path: "/claims" },
    { label: "My Policy",  path: "/policy" },
  ];

  const adminLinks = [
    { label: "Admin Panel", path: "/admin" },
  ];

  const links = role === "admin" ? adminLinks : workerLinks;

  return (
    <nav className="navbar">
      <span className="navbar-brand" onClick={() => navigate(role === "admin" ? "/admin" : "/dashboard")}>
        Gig<span>Shield</span> AI
      </span>
      <div className="navbar-links">
        {links.map(({ label, path }) => (
          <button key={path} className={`nav-link${location.pathname === path ? " active" : ""}`} onClick={() => navigate(path)}>
            {label}
          </button>
        ))}
        <button className="nav-logout" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}