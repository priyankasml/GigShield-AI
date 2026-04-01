import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const login = async () => {
    await API.post("/login", form);
    navigate("/dashboard");
  };

  return (
    <div className="container" style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
      <div className="card" style={{width:"300px"}}>
        <h2>Login</h2>
        <input className="input" placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
        <input className="input" type="password" placeholder="Password" onChange={e=>setForm({...form,password:e.target.value})}/>
        <button className="btn" onClick={login}>Login</button>
        <p onClick={()=>navigate("/signup")} style={{cursor:"pointer"}}>Signup</p>
      </div>
    </div>
  );
}