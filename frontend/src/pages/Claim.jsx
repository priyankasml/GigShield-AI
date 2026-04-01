import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Claim() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const simulate = async () => {
    const res = await API.get("/simulate-rain");
    setResult(res.data);
  };

  return (
    <div>
      <Navbar logout={logout} />

      <div style={s.container}>
        <h2>🌧 Rain Simulation</h2>

        <button onClick={simulate} style={s.btn}>
          Trigger Rain
        </button>

        {result && (
          <div>
            <p>{result.message}</p>
            {result.trigger && <h3>💸 ₹{result.payout}</h3>}
          </div>
        )}
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