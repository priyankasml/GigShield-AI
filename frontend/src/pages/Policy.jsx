import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { PageLoader } from "../components/Loader";
import API from "../services/api";

const PLANS = [
  {
    id: "basic", name: "Basic Shield", price: "₹199/mo", coverage: "₹50,000", color: "var(--text-secondary)",
    features: ["Accident Cover","Platform Suspension","24/7 AI Support","Quick Claims (3 days)"],
  },
  {
    id: "standard", name: "Standard Shield", price: "₹399/mo", coverage: "₹1,50,000", color: "var(--orange)", badge: "POPULAR",
    features: ["All Basic Features","Illness Cover","Vehicle Damage","Priority Claims (1 day)","Equipment Loss"],
  },
  {
    id: "premium", name: "Premium Shield", price: "₹699/mo", coverage: "₹5,00,000", color: "#a855f7",
    features: ["All Standard Features","Family Health Cover","Income Replacement","Instant Claims","Dedicated Manager","Legal Aid"],
  },
];

const statusBadge = (s) => {
  const map = { active:"badge-green", expired:"badge-red", pending:"badge-orange" };
  return <span className={`badge ${map[s] || "badge-gray"}`}>{s}</span>;
};

export default function Policy() {
  const [policy, setPolicy]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying]   = useState(null);
  const [alert, setAlert]     = useState(null);

  useEffect(() => {
    API.get("/policy").then(res => setPolicy(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const buyPlan = async (planId) => {
    setBuying(planId);
    try {
      const res = await API.post("/policy/purchase", { plan_type: planId });
      setPolicy(res.data);
      setAlert({ type:"success", msg:`${PLANS.find(p=>p.id===planId)?.name} activated successfully!` });
    } catch (err) {
      setAlert({ type:"error", msg: err.response?.data?.message || "Purchase failed." });
    } finally {
      setBuying(null);
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
            <h1 className="page-title">My <span>Policy</span></h1>
            <div className="page-line" />

            {alert && (
              <div className={`alert alert-${alert.type === "error" ? "error" : "success"}`}
                style={{ cursor:"pointer" }} onClick={() => setAlert(null)}>
                {alert.msg}
              </div>
            )}

            {loading ? <PageLoader /> : (
              <>
                {policy ? (
                  <div className="table-card" style={{ marginBottom:"2.5rem" }}>
                    <p className="table-title">Active Policy</p>
                    <div className="grid-3">
                      {[
                        ["Policy Number", policy.policy_number],
                        ["Plan",          policy.plan_type],
                        ["Coverage",      `₹${policy.coverage_amount}`],
                        ["Premium",       `₹${policy.premium_amount}/mo`],
                        ["Start Date",    new Date(policy.start_date).toLocaleDateString("en-IN")],
                        ["End Date",      new Date(policy.end_date).toLocaleDateString("en-IN")],
                      ].map(([label, value]) => (
                        <div key={label} style={{ padding:"0.75rem 0", borderBottom:"1px solid var(--border)" }}>
                          <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.62rem", letterSpacing:"2px", color:"var(--text-dim)", textTransform:"uppercase", marginBottom:"0.35rem" }}>{label}</p>
                          <p style={{ fontSize:"0.92rem", color:"var(--text-primary)", fontWeight:500 }}>{value}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop:"1.25rem", display:"flex", alignItems:"center", gap:"1rem" }}>
                      <span style={{ color:"var(--text-secondary)", fontSize:"0.88rem" }}>Status:</span>
                      {statusBadge(policy.status)}
                    </div>
                  </div>
                ) : (
                  <div className="info-box" style={{ marginBottom:"2.5rem" }}>
                    <p className="info-box-title">No Active Policy</p>
                    <p className="info-box-text">You don't have an active policy. Choose a plan below to get protected.</p>
                  </div>
                )}

                <p className="page-label" style={{ marginBottom:"1.25rem" }}>Available Plans</p>
                <div className="grid-3">
                  {PLANS.map(plan => (
                    <div key={plan.id} className="table-card" style={{
                      border:`1px solid ${plan.id==="standard" ? "var(--orange-border)" : "var(--border)"}`,
                      position:"relative", overflow:"visible",
                    }}>
                      {plan.badge && (
                        <span className="badge badge-orange" style={{ position:"absolute", top:"-12px", left:"50%", transform:"translateX(-50%)" }}>
                          {plan.badge}
                        </span>
                      )}
                      <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", letterSpacing:"3px", textTransform:"uppercase", color:plan.color, marginBottom:"0.5rem" }}>{plan.name}</p>
                      <p style={{ fontSize:"1.8rem", fontWeight:800, color:plan.color, letterSpacing:"-1px", marginBottom:"0.25rem" }}>{plan.price}</p>
                      <p style={{ fontSize:"0.85rem", color:"var(--text-secondary)", marginBottom:"1.25rem" }}>
                        Coverage up to <strong style={{ color:"var(--text-primary)" }}>{plan.coverage}</strong>
                      </p>
                      <hr className="divider" />
                      <ul style={{ listStyle:"none", marginBottom:"1.5rem", display:"flex", flexDirection:"column", gap:"0.5rem" }}>
                        {plan.features.map(f => (
                          <li key={f} style={{ fontSize:"0.85rem", color:"var(--text-secondary)", display:"flex", alignItems:"center", gap:"0.5rem" }}>
                            <span style={{ color:"var(--green)", fontSize:"0.7rem" }}>✓</span> {f}
                          </li>
                        ))}
                      </ul>
                      <button
                        className={`btn ${plan.id==="standard" ? "btn-primary" : "btn-outline"} btn-full`}
                        onClick={() => buyPlan(plan.id)}
                        disabled={buying === plan.id || policy?.status === "active"}>
                        {buying === plan.id ? <><span className="spinner" /> Processing...</> : policy?.status === "active" ? "Already Active" : "Get This Plan"}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}