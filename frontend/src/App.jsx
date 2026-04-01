import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Policy from "./pages/Policy";
import Claim from "./pages/Claim";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/claim" element={<Claim />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;