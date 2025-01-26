import React, { useState } from "react";
import axios from "axios"; // Import axios
import "../styles/LoanCalculator.css";
import { useNavigate } from "react-router-dom";

const ProceedPopup = ({ open, onClose, calculatedLoan }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cnic: "",
    name: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // To track form submission state
  const [responseMessage, setResponseMessage] = useState(""); // To display success/error messages

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start submitting

    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponseMessage(
        "Form submitted successfully! Please check your email for login credentials."
      ); // Show success message
      navigate("/login");

      console.log("Response from server:", response.data);
      setIsSubmitting(false); // End submission
      onClose(); // Close the popup after successful submission
    } catch (error) {
      setResponseMessage(
        "There was an error submitting the form. Please try again."
      );
      console.error("Error submitting form:", error);
      setIsSubmitting(false); // End submission on error
    }
  };

  if (!open) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Loan Details</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cnic">CNIC</label>
            <input
              type="text"
              style={{ width: "95%" }}
              id="cnic"
              name="cnic"
              value={formData.cnic}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              style={{ width: "95%" }}
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              style={{ width: "95%" }}
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
          </div>

          {/* Displaying Response Message */}
          {responseMessage && (
            <div className="response-message">
              <p>{responseMessage}</p>
            </div>
          )}

          <div className="button-group">
            {/* Submit Button (disabled while submitting) */}
            <button
              type="submit"
              className="proceed-btn"
              disabled={isSubmitting} // Disable while submitting
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            <button type="button" className="calculate-btn" onClick={onClose}>
              Close
            </button>
            <div className="login-link-container">
              <span>Go to</span>{" "}
              <a href="/login" className="login-link">
                Login
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProceedPopup;
