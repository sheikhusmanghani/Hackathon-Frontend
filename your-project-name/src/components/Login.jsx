import React, { useState } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom"; // Importing useNavigate if you're using React Router
import "../styles/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); // To hold error messages
  const [loading, setLoading] = useState(false); // To track loading state
  const navigate = useNavigate(); // To navigate to another page after successful login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when request is made
    setErrorMessage(""); // Reset the error message

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData
      );
      console.log("response.data-=====", response.data.data.token);

      // Store token in localStorage
      localStorage.setItem("token", response.data.data.token);

      alert("Login successful!");

      // Redirect to the /dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );
      setErrorMessage("Invalid credentials. Please try again.");
    } finally {
      setLoading(false); // Set loading state to false once the request is completed
    }
  };

  return (
    <div className="login-section">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Username/Email Input */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              style={{ width: "90%" }}
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">
              Password{" "}
              <span style={{ fontSize: "13px" }}> (Given via Email) </span>
            </label>
            <input
              type="password"
              id="password"
              style={{ width: "90%" }}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {/* Login Button */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Error Message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Optional: Forgot Password and Signup Link */}
        {/* <a href="#" className="forgot-password">Forgot your password?</a> */}
        {/* <p className="signup-link">Don’t have an account? <a href="/signup">Sign up</a></p> */}
        
      </div>
    </div>
  );
};

export default Login;
