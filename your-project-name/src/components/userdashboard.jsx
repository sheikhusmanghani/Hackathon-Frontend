import React from "react";
import "../styles/UserDashboard.css"; // Import custom CSS

const UserDashboard = () => {
  // Static data for loan details and guarantors
  const user = { name: "Ahmed Ali" };
  const loanDetails = {
    category: "Wedding Loans",
    subcategory: "Valima",
    loanAmount: "PKR 5,00,000",
    loanPeriod: "3",
    guarantor1: { name: "Ali Khan" },
    guarantor2: { name: "Sara Ahmed" },
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="header">
          <h2>Welcome, {user.name}</h2>
          <p>Here's a summary of your loan application.</p>
        </div>

        <div className="grid-container">
          {/* Loan Details */}
          <div className="card">
            <h3>Loan Details</h3>
            <p>
              <strong>Category:</strong> {loanDetails.category}
            </p>
            <p>
              <strong>Subcategory:</strong> {loanDetails.subcategory}
            </p>
            <p>
              <strong>Loan Amount:</strong> {loanDetails.loanAmount}
            </p>
            <p>
              <strong>Loan Period:</strong> {loanDetails.loanPeriod} years
            </p>
            <button className="view-button">View Loan Slip</button>
          </div>

          {/* Guarantor Information */}
          <div className="card">
            <h3>Guarantor Information</h3>
            <p>
              <strong>Guarantor 1:</strong> {loanDetails.guarantor1.name}
            </p>
            <p>
              <strong>Guarantor 2:</strong> {loanDetails.guarantor2.name}
            </p>
            <button className="view-button">Update Guarantor Info</button>
          </div>

          {/* Edit Loan Request Button */}
          <div className="edit-request-container">
            <button className="edit-loan-button">Edit Loan Request</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
