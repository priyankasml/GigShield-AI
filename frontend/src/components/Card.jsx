export default function Card({ title, value, icon }) {
  return (
    <div style={s.card}>
      <div style={s.top}>
        <span style={s.icon}>{icon}</span>
        <p style={s.title}>{title}</p>
      </div>
      <h2 style={s.value}>{value}</h2>
    </div>
  );
}

const s = {
  card: {
    background: "#12182b",
    padding: "20px",
    borderRadius: "12px",
    width: "200px",
    boxShadow: "0 0 15px rgba(0,0,0,0.4)"
  },
  top: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  icon: {
    fontSize: "20px"
  },
  title: {
    fontSize: "14px",
    color: "#9ca3af"
  },
  value: {
    marginTop: "10px",
    color: "#4fc3f7"
  }
};