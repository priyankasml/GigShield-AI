import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const login = async () => {
    if (!form.email || !form.password) { setError("Please fill all fields."); return; }
    setLoading(true); setError("");
    try {
      const res = await API.post("/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role",  res.data.role || "worker");
      if (res.data.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-root">
      <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />

      <div className="auth-left">
        <div className="auth-left-inner">
          <p className="auth-eyebrow">GigShield AI</p>
          <h1 className="auth-hero">Welcome<br />Back.</h1>
          <p className="auth-sub">Secure your earnings with AI-powered gig insurance. Real-time protection, zero paperwork.</p>
          <div className="auth-stats">
            {[["12K+","Workers Protected"],["₹2.4Cr","Claims Paid"],["98%","Approval Rate"]].map(([val,lab]) => (
              <div key={lab}>
                <p className="auth-stat-val">{val}</p>
                <p className="auth-stat-lab">{lab}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="card auth-card">
          <div className="tabs">
            <button className="tab active">Sign In</button>
            <button className="tab" onClick={() => navigate("/signup")}>Sign Up</button>
          </div>
          <h2 className="card-title">Sign in to your account</h2>
          <p className="card-sub">Enter your credentials to continue</p>
          {error && <div className="alert alert-error">{error}</div>}
          <div className="field">
            <label className="field-label">Email Address</label>
            <input className="field-input" type="email" placeholder="you@example.com"
              value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))}
              onKeyDown={e => e.key === "Enter" && login()} />
          </div>
          <div className="field">
            <label className="field-label">Password</label>
            <input className="field-input" type="password" placeholder="••••••••"
              value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))}
              onKeyDown={e => e.key === "Enter" && login()} />
          </div>
          <button className="btn btn-primary btn-full" onClick={login} disabled={loading} style={{ marginTop:"0.5rem" }}>
            {loading ? <><span className="spinner" /> Signing in...</> : "Login"}
          </button>
          <p className="switch-text">
            Don't have an account?{" "}
            <span className="switch-link" onClick={() => navigate("/signup")}>Sign Up</span>
          </p>
        </div>
      </div>
      <style>{`input::placeholder{color:#555;}`}</style>
    </div>
  );
}