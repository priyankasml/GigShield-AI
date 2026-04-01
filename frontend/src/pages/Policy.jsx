import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Policy() {
  const navigate = useNavigate();
  const [premium, setPremium] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const getPremium = async () => {
    const res = await API.post("/calculate-premium", {
      location: "high-risk"
    });
    setPremium(res.data.weekly_premium);
  };

  return (
    <div>
      <Navbar logout={logout} />

      <div style={s.container}>
        <h2>💰 Insurance Policy</h2>

        <button onClick={getPremium} style={s.btn}>
          Calculate Premium
        </button>

        {premium && <h3>Weekly Premium: ₹{premium}</h3>}
      </div>
    </div>
  );
}

const s = {
  container: {
    textAlign: "center",
    marginTop: "50px"
  },
  btn: {
    padding: "10px",
    background: "#1565c0",
    color: "white",
    border: "none"
  }
};