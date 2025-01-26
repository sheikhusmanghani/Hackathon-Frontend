import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoanCalculator from "./components/LoanCalculator";
import "./App.css";
import Login from "./components/Login"; 
import UserDashboard from "./components/userdashboard";
import AdminDashboard from "./components/adminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<LoanCalculator />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
