import Sidebar from "../components/Sidebar";
import Card from "../components/Card";

export default function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ marginLeft: "220px", padding: "20px" }}>
        <h1>Dashboard</h1>

        <div style={{ display: "flex", gap: "20px" }}>
          <Card title="Earnings Protected" value="₹12,000" icon="💰" />
          <Card title="Active Policies" value="3" icon="📄" />
          <Card title="Claims" value="5" icon="🌧" />
        </div>
      </div>
    </div>
  );
}