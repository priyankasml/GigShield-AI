import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { StatCard } from "../components/Card";
import { PageLoader } from "../components/Loader";
import API from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/dashboard")
      .then(res => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statusBadge = (s) => {
    const map = { approved:"badge-green", pending:"badge-orange", rejected:"badge-red", active:"badge-green", expired:"badge-red" };
    return <span className={`badge ${map[s] || "badge-gray"}`}>{s}</span>;
  };

  const name = data?.name || "Worker";

  return (
    <>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main className="main-content">
          {loading ? <PageLoader /> : (
            <div className="page">
              <p className="page-label">Overview</p>
              <h1 className="page-title">Hello, <span>{name.split(" ")[0]}</span> 👋</h1>
              <div className="page-line" />

              <div className="grid-4" style={{ marginBottom:"2rem" }}>
                <StatCard label="Active Policy"   value={data?.activePolicy    || "—"}     color="orange" />
                <StatCard label="Total Claims"    value={data?.totalClaims     ?? 0} />
                <StatCard label="Approved Claims" value={data?.approvedClaims  ?? 0}        color="green" />
                <StatCard label="Amount Received" value={`₹${data?.amountReceived ?? 0}`}  color="green" />
              </div>

              {data?.riskScore !== undefined && (
                <div className="info-box" style={{ marginBottom:"2rem" }}>
                  <p className="info-box-title">AI Risk Assessment</p>
                  <div style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>
                    <div style={{ fontSize:"2.5rem", fontWeight:800, color:"var(--orange)" }}>
                      {data.riskScore}<span style={{ fontSize:"1rem", color:"var(--text-secondary)" }}>/100</span>
                    </div>
                    <p className="info-box-text">{data.riskMessage || "Your risk profile is being evaluated."}</p>
                  </div>
                </div>
              )}

              <div className="table-card" style={{ marginBottom:"2rem" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"1.25rem" }}>
                  <p className="table-title">Recent Claims</p>
                  <button className="btn btn-outline btn-sm" onClick={() => navigate("/claims")}>View All</button>
                </div>
                {data?.recentClaims?.length ? (
                  <div className="table-wrap">
                    <table>
                      <thead><tr><th>Claim #</th><th>Type</th><th>Amount</th><th>Filed</th><th>Status</th></tr></thead>
                      <tbody>
                        {data.recentClaims.map(c => (
                          <tr key={c.id}>
                            <td className="mono">{c.claim_number}</td>
                            <td>{c.claim_type}</td>
                            <td>₹{c.amount_requested}</td>
                            <td>{new Date(c.filed_at).toLocaleDateString("en-IN")}</td>
                            <td>{statusBadge(c.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-state-icon">◎</div>
                    <p className="empty-state-text">No claims filed yet.</p>
                    <button className="btn btn-primary btn-sm" style={{ marginTop:"1rem" }} onClick={() => navigate("/claims")}>
                      File Your First Claim
                    </button>
                  </div>
                )}
              </div>

              {data?.policy && (
                <div className="table-card">
                  <p className="table-title">Current Policy</p>
                  <div className="grid-3">
                    {[
                      ["Plan",       data.policy.plan_type],
                      ["Coverage",   `₹${data.policy.coverage_amount}`],
                      ["Premium",    `₹${data.policy.premium_amount}/mo`],
                      ["Start Date", new Date(data.policy.start_date).toLocaleDateString("en-IN")],
                      ["End Date",   new Date(data.policy.end_date).toLocaleDateString("en-IN")],
                      ["Status",     data.policy.status],
                    ].map(([label, value]) => (
                      <div key={label} style={{ padding:"0.75rem 0", borderBottom:"1px solid var(--border)" }}>
                        <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem", letterSpacing:"2px", color:"var(--text-dim)", textTransform:"uppercase", marginBottom:"0.35rem" }}>{label}</p>
                        <p style={{ fontSize:"0.92rem", color:"var(--text-primary)", fontWeight:500 }}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </>
  );
}