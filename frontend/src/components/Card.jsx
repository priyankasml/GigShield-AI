import { useState } from "react";

export default function Card({ children, style, hover = true }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        ...s.card,
        ...(hover && hovered ? s.cardHover : {}),
        ...style,
      }}
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
    >
      {children}
    </div>
  );
}

// Stat card variant
export function StatCard({ label, value, color = "#4fc3f7", icon }) {
  return (
    <Card style={s.statCard}>
      <div style={s.statTop}>
        <p style={s.statLabel}>{label}</p>
        {icon && <span style={s.statIcon}>{icon}</span>}
      </div>
      <p style={{ ...s.statValue, color }}>{value}</p>
    </Card>
  );
}

// Info row variant
export function InfoCard({ icon, title, desc }) {
  return (
    <Card style={s.infoCard}>
      <span style={{ fontSize: "1.5rem" }}>{icon}</span>
      <p style={s.infoTitle}>{title}</p>
      <p style={s.infoDesc}>{desc}</p>
    </Card>
  );
}

// Field / detail card variant
export function FieldCard({ label, value, editing, onChange }) {
  return (
    <Card hover={false} style={s.fieldCard}>
      <p style={s.fieldLabel}>{label}</p>
      {editing ? (
        <input
          style={s.fieldInput}
          value={value ?? ""}
          onChange={e => onChange(e.target.value)}
          onFocus={e => (e.target.style.borderColor = "#4fc3f7")}
          onBlur={e => (e.target.style.borderColor = "rgba(79,195,247,0.2)")}
        />
      ) : (
        <p style={s.fieldValue}>{value}</p>
      )}
    </Card>
  );
}

const s = {
  card: {
    background: "rgba(13,18,37,0.9)",
    border: "1px solid rgba(79,195,247,0.12)",
    borderRadius: 12,
    padding: "1.25rem 1.5rem",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  cardHover: {
    borderColor: "rgba(79,195,247,0.35)",
    boxShadow: "0 0 24px rgba(79,195,247,0.1)",
  },
  statCard: { padding: "1.25rem 1.5rem" },
  statTop: { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.5rem" },
  statLabel: { fontFamily:"monospace", fontSize:"0.62rem", letterSpacing:"2px", color:"#546e7a", textTransform:"uppercase", margin:0 },
  statIcon: { fontSize:"1.1rem" },
  statValue: { fontFamily:"'Georgia',serif", fontSize:"2rem", fontWeight:700, margin:0, letterSpacing:"1px" },
  infoCard: { textAlign:"center", padding:"1.5rem" },
  infoTitle: { fontFamily:"monospace", fontSize:"0.7rem", letterSpacing:"2px", color:"#4fc3f7", textTransform:"uppercase", margin:"0.5rem 0 0.4rem" },
  infoDesc: { fontSize:"0.8rem", color:"#546e7a", lineHeight:1.6, margin:0 },
  fieldCard: { padding:"1.25rem 1.5rem" },
  fieldLabel: { fontFamily:"monospace", fontSize:"0.62rem", letterSpacing:"2px", color:"#546e7a", textTransform:"uppercase", marginBottom:"0.5rem", margin:"0 0 0.5rem" },
  fieldValue: { fontFamily:"monospace", fontSize:"1rem", color:"#e8eaf6", margin:0 },
  fieldInput: { width:"100%", background:"rgba(5,8,16,0.7)", border:"1px solid rgba(79,195,247,0.2)", borderRadius:6, color:"#e8eaf6", fontFamily:"monospace", fontSize:"0.9rem", padding:"0.5rem 0.75rem", outline:"none", boxSizing:"border-box", transition:"border-color 0.2s" },
};