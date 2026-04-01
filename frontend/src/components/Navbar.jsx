import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();

  return (
    <div style={{display:"flex", justifyContent:"space-between", padding:"10px 20px", background:"#12182b"}}>
      <h3>GigShield</h3>
      <div>
        <button onClick={()=>nav("/dashboard")}>Dashboard</button>
        <button onClick={()=>nav("/policy")}>Policy</button>
        <button onClick={()=>nav("/claim")}>Claim</button>
      </div>
    </div>
  );
}