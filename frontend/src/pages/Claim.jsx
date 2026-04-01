import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { PageLoader } from "../components/Loader";
import API from "../services/api";

const CLAIM_TYPES = ["Accident","Illness","Platform Suspension","Vehicle Damage","Equipment Loss","Other"];

const statusBadge = (s) => {
  const map = { approved:"badge-green", pending:"badge-orange", rejected:"badge-red", reviewing:"badge-blue" };
  return <span className={`badge ${map[s] || "badge-gray"}`}>{s}</span>;
};

export default function Claim() {
  const [claims, setClaims]         = useState([]);
  const [loading, setLoading]       = useState(true);
  const [showModal, setShowModal]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert]           = useState(null);
  const [form, setForm] = useState({ claim_type:"", amount_requested:"", description:"", document_url:"" });

  const fetchClaims = () => {
    API.get("/claims").then(res => setClaims(res.data || [])).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchClaims(); }, []);

  const submitClaim = async () => {
    if (!form.claim_type || !form.amount_requested || !form.description) {
      setAlert({ type:"error", msg:"Please fill all required fields." }); return;
    }
    setSubmitting(true);
    try {
      await API.post("/claims", form);
      setAlert({ type:"success", msg:"Claim submitted! AI is reviewing it." });
      setShowModal(false);
      setForm({ claim_type:"", amount_requested:"", description:"", document_url:"" });
      fetchClaims();
    } catch (err) {
      setAlert({ type:"error", msg: err.response?.data?.message || "Failed to submit claim." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          <div className="page">
            <p className="page-label">Insurance</p>
            <h1 className="page-title">My <span>Claims</span></h1>
            <div className="page-line" />

            {alert && (
              <div className={`alert alert-${alert.type === "error" ? "error" : "success"}`}
                style={{ cursor:"pointer" }} onClick={() => setAlert(null)}>
                {alert.msg}
              </div>
            )}

            <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:"1.5rem" }}>
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ File New Claim</button>
            </div>

            <div className="table-card">
              <p className="table-title">All Claims</p>
              {loading ? <PageLoader /> : claims.length ? (
                <div className="table-wrap">
                  <table>
                    <thead><tr><th>Claim #</th><th>Type</th><th>Requested</th><th>Approved</th><th>Filed</th><th>AI Score</th><th>Status</th></tr></thead>
                    <tbody>
                      {claims.map(c => (
                        <tr key={c.id}>
                          <td className="mono">{c.claim_number}</td>
                          <td>{c.claim_type}</td>
                          <td>₹{c.amount_requested}</td>
                          <td>{c.amount_approved ? `₹${c.amount_approved}` : "—"}</td>
                          <td>{new Date(c.filed_at).toLocaleDateString("en-IN")}</td>
                          <td><span style={{ color:"var(--orange)", fontFamily:"var(--font-mono)", fontSize:"0.8rem" }}>
                            {c.ai_confidence != null ? `${Math.round(c.ai_confidence*100)}%` : "—"}
                          </span></td>
                          <td>{statusBadge(c.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">◎</div>
                  <p className="empty-state-text">No claims yet. File your first claim.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">File a New Claim</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="field">
              <label className="field-label">Claim Type *</label>
              <select className="field-input" value={form.claim_type} onChange={e => setForm(f => ({...f, claim_type: e.target.value}))}>
                <option value="">Select type...</option>
                {CLAIM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="field">
              <label className="field-label">Amount Requested (₹) *</label>
              <input className="field-input" type="number" placeholder="e.g. 5000"
                value={form.amount_requested} onChange={e => setForm(f => ({...f, amount_requested: e.target.value}))} />
            </div>
            <div className="field">
              <label className="field-label">Description *</label>
              <textarea className="field-input" rows={4} placeholder="Describe the incident in detail..."
                value={form.description} style={{ resize:"vertical" }}
                onChange={e => setForm(f => ({...f, description: e.target.value}))} />
            </div>
            <div className="field">
              <label className="field-label">Document URL (optional)</label>
              <input className="field-input" type="url" placeholder="https://drive.google.com/..."
                value={form.document_url} onChange={e => setForm(f => ({...f, document_url: e.target.value}))} />
            </div>
            <div className="info-box" style={{ marginBottom:"1.25rem" }}>
              <p className="info-box-title">AI Review</p>
              <p className="info-box-text">Your claim will be reviewed by our AI engine within minutes.</p>
            </div>
            <div style={{ display:"flex", gap:"0.75rem" }}>
              <button className="btn btn-outline" style={{ flex:1 }} onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" style={{ flex:2 }} onClick={submitClaim} disabled={submitting}>
                {submitting ? <><span className="spinner" /> Submitting...</> : "Submit Claim"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}