import Navbar from "../components/Navbar";
import { useState } from "react";
import API from "../services/api";

export default function Claim() {
  const [resData, setResData] = useState(null);

  const simulate = async () => {
    const res = await API.get("/simulate-rain");
    setResData(res.data);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Claim Simulation</h2>
        <button className="btn" onClick={simulate}>Trigger</button>

        {resData && (
          <div>
            <p>{resData.message}</p>
            {resData.trigger && <h3>💸 ₹{resData.payout}</h3>}
          </div>
        )}
      </div>
    </div>
  );
}