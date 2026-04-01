import Navbar from "../components/Navbar";
import { useState } from "react";
import API from "../services/api";

export default function Policy() {
  const [premium, setPremium] = useState(null);

  const getPremium = async () => {
    const res = await API.post("/calculate-premium", { location: "high-risk" });
    setPremium(res.data.weekly_premium);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h2>Policy</h2>
        <button className="btn" onClick={getPremium}>Calculate</button>
        {premium && <h3>₹{premium}</h3>}
      </div>
    </div>
  );
}