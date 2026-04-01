import { useState, useEffect } from "react";
import { StatCard } from "../components/Card";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { PageLoader } from "../components/Loader";
import API from "../services/api";

const statusBadge = (s) => {
  const map = { approved:"badge-green", pending:"badge-orange", rejected:"badge-red", active:"badge-green", expired:"badge-red", reviewing:"badge-blue" };
  return <span className={`badge ${map[s] || "badge-gray"}`}>{s}</span>;
};

export default function AdminPanel() {
  const [tab, setTab]           = useState("overview");
  const [stats, setStats]       = useState(null);
  const [claims, setClaims]     = useState([]);
  const [workers, setWorkers]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [alert, setAlert]       = useState(null);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    Promise.all([API.get("/admin/stats"), API.get("/admin/claims"), API.get("/admin/workers")])
      .then(([s, c, w]) => { setStats(s.data); setClaims(c.data || []); setWorkers(w.data || []); })
      .catch(() => {}).finally(() => setLoading(false));
  }, []);

  const updateClaim = async (id, status) => {
    setUpdating(id);
    try {
      await API.patch(`/admin/claims/${id}`, { status });
      setClaims(prev => prev.map(c => c.id === id ? {...c, status} : c));
      setAlert({ type:"success", msg:`Claim ${status} successfully.` });
    } catch {
      setAlert({ type:"error", msg:"Failed to update claim." });
    } finally {
      setUpdating(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          <div className="page">
            <p className="page-label">Administration</p>
            <h1 className="page-title"><span>Admin</span> Panel</h1>
            <div className="page-line" />

            {alert && (
              <div className={`alert alert-${alert.type==="error" ? "error" : "success"}`}
                style={{ cursor:"pointer" }} onClick={() => setAlert(null)}>
                {alert.msg}
              </div>
            )}

            <div className="tabs" style={{ maxWidth:360, marginBottom:"2rem" }}>
              {[{id:"overview",label:"Overview"},{id:"claims",label:"Claims"},{id:"workers",label:"Workers"}].map(t => (
                <button key={t.id} className={`tab${tab===t.id ? " active" : ""}`} onClick={() => setTab(t.id)}>{t.label}</button>
              ))}
            </div>

            {loading ? <PageLoader /> : (
              <>
                {tab === "overview" && (
                  <>
                    <div className="grid-4" style={{ marginBottom:"2rem" }}>
                      <StatCard label="Total Workers"   value={stats?.totalWorkers   ?? 0} />
                      <StatCard label="Active Policies" value={stats?.activePolicies ?? 0} color="orange" />
                      <StatCard label="Pending Claims"  value={stats?.pendingClaims  ?? 0} color="orange" />
                      <StatCard label="Total Paid Out"  value={`₹${stats?.totalPaidOut ?? 0}`} color="green" />
                    </div>
                    <div className="table-card">
                      <p className="table-title">Pending Claims — Quick Review</p>
                      <div className="table-wrap">
                        <table>
                          <thead><tr><th>Worker</th><th>Type</th><th>Amount</th><th>AI Score</th><th>Status</th><th>Actions</th></tr></thead>
                          <tbody>
                            {claims.filter(c => c.status==="pending").slice(0,5).map(c => (
                              <tr key={c.id}>
                                <td>{c.worker_name}</td>
                                <td>{c.claim_type}</td>
                                <td>₹{c.amount_requested}</td>
                                <td><span style={{ color:"var(--orange)", fontFamily:"var(--font-mono)", fontSize:"0.8rem" }}>
                                  {c.ai_confidence != null ? `${Math.round(c.ai_confidence*100)}%` : "—"}
                                </span></td>
                                <td>{statusBadge(c.status)}</td>
                                <td>
                                  <div style={{ display:"flex", gap:"0.5rem" }}>
                                    <button className="btn btn-outline btn-sm" style={{ color:"var(--green)", borderColor:"rgba(34,197,94,0.3)" }}
                                      disabled={updating===c.id} onClick={() => updateClaim(c.id, "approved")}>
                                      {updating===c.id ? <span className="spinner" /> : "Approve"}
                                    </button>
                                    <button className="btn btn-danger btn-sm" disabled={updating===c.id} onClick={() => updateClaim(c.id, "rejected")}>
                                      Reject
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                            {claims.filter(c => c.status==="pending").length === 0 && (
                              <tr><td colSpan={6} style={{ textAlign:"center", padding:"2rem", color:"var(--text-dim)" }}>No pending claims</td></tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}

                {tab === "claims" && (
                  <div className="table-card">
                    <p className="table-title">All Claims</p>
                    <div className="table-wrap">
                      <table>
                        <thead><tr><th>Claim #</th><th>Worker</th><th>Type</th><th>Requested</th><th>Approved</th><th>AI Score</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                          {claims.map(c => (
                            <tr key={c.id}>
                              <td className="mono">{c.claim_number}</td>
                              <td>{c.worker_name}</td>
                              <td>{c.claim_type}</td>
                              <td>₹{c.amount_requested}</td>
                              <td>{c.amount_approved ? `₹${c.amount_approved}` : "—"}</td>
                              <td><span style={{ color:"var(--orange)", fontFamily:"var(--font-mono)", fontSize:"0.8rem" }}>
                                {c.ai_confidence != null ? `${Math.round(c.ai_confidence*100)}%` : "—"}
                              </span></td>
                              <td>{statusBadge(c.status)}</td>
                              <td>
                                {c.status === "pending" && (
                                  <div style={{ display:"flex", gap:"0.5rem" }}>
                                    <button className="btn btn-outline btn-sm" style={{ color:"var(--green)", borderColor:"rgba(34,197,94,0.3)" }}
                                      disabled={updating===c.id} onClick={() => updateClaim(c.id, "approved")}>
                                      {updating===c.id ? <span className="spinner" /> : "Approve"}
                                    </button>
                                    <button className="btn btn-danger btn-sm" disabled={updating===c.id} onClick={() => updateClaim(c.id, "rejected")}>
                                      Reject
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                          {!claims.length && (
                            <tr><td colSpan={8} style={{ textAlign:"center", padding:"2rem", color:"var(--text-dim)" }}>No claims found</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {tab === "workers" && (
                  <div className="table-card">
                    <p className="table-title">Registered Workers</p>
                    <div className="table-wrap">
                      <table>
                        <thead><tr><th>Name</th><th>Email</th><th>Platform</th><th>Avg Income</th><th>Policy</th><th>Claims</th><th>Joined</th></tr></thead>
                        <tbody>
                          {workers.map(w => (
                            <tr key={w.id}>
                              <td style={{ color:"var(--text-primary)", fontWeight:500 }}>{w.name}</td>
                              <td>{w.email}</td>
                              <td>{w.platform || "—"}</td>
                              <td>{w.avg_monthly_income ? `₹${w.avg_monthly_income}` : "—"}</td>
                              <td>{w.policy_status ? statusBadge(w.policy_status) : <span className="badge badge-gray">None</span>}</td>
                              <td style={{ fontFamily:"var(--font-mono)", fontSize:"0.82rem" }}>{w.total_claims ?? 0}</td>
                              <td style={{ color:"var(--text-dim)", fontSize:"0.82rem" }}>
                                {new Date(w.joined_at || w.created_at).toLocaleDateString("en-IN")}
                              </td>
                            </tr>
                          ))}
                          {!workers.length && (
                            <tr><td colSpan={7} style={{ textAlign:"center", padding:"2rem", color:"var(--text-dim)" }}>No workers found</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}