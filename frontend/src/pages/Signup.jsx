import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ name:"", email:"", password:"", phone:"", role:"worker" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const signup = async () => {
    if (!form.name || !form.email || !form.password) { setError("Please fill all required fields."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true); setError("");
    try {
      const res = await API.post("/signup", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role",  res.data.role || "worker");
      if (res.data.role === "admin") navigate("/admin");
      else navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
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
          <h1 className="auth-hero">Start your<br />journey.</h1>
          <p className="auth-sub">Protect your gig income from unexpected disruptions. Join thousands of workers already covered.</p>
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
            <button className="tab" onClick={() => navigate("/")}>Sign In</button>
            <button className="tab active">Sign Up</button>
          </div>
          <h2 className="card-title">Create your account</h2>
          <p className="card-sub">Fill in the details to get started</p>
          <div className="role-row">
            {[["worker","Worker"],["admin","Admin"]].map(([val,label]) => (
              <button key={val} className={`role-btn${form.role === val ? " active" : ""}`}
                onClick={() => setForm(f => ({...f, role: val}))}>
                {label}
              </button>
            ))}
          </div>
          {error && <div className="alert alert-error">{error}</div>}
          {[
            { key:"name",     label:"Full Name",     type:"text",     ph:"John Doe" },
            { key:"email",    label:"Email Address", type:"email",    ph:"you@example.com" },
            { key:"phone",    label:"Phone Number",  type:"tel",      ph:"+91 98765 43210" },
            { key:"password", label:"Password",      type:"password", ph:"Min. 6 characters" },
          ].map(({ key, label, type, ph }) => (
            <div key={key} className="field">
              <label className="field-label">{label}</label>
              <input className="field-input" type={type} placeholder={ph}
                value={form[key]} onChange={e => setForm(f => ({...f, [key]: e.target.value}))} />
            </div>
          ))}
          <button className="btn btn-primary btn-full" onClick={signup} disabled={loading} style={{ marginTop:"0.5rem" }}>
            {loading ? <><span className="spinner" /> Creating account...</> : "Register"}
          </button>
          <p className="switch-text">
            Already have an account?{" "}
            <span className="switch-link" onClick={() => navigate("/")}>Sign In</span>
          </p>
        </div>
      </div>
      <style>{`input::placeholder{color:#555;}`}</style>
    </div>
  );
}