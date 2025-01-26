import React from "react";
import "../styles/AdminDashboard.css"; // Import custom CSS

const AdminDashboard = () => {
  // Static data for pending applications
  const pendingApplications = [
    {
      id: 1,
      name: "Ahmed Ali",
      loanCategory: "Wedding Loans",
      amount: "PKR 5,00,000",
    },
    {
      id: 2,
      name: "Sara Khan",
      loanCategory: "Education Loans",
      amount: "PKR 3,00,000",
    },
    {
      id: 3,
      name: "Ali Raza",
      loanCategory: "Business Loans",
      amount: "PKR 10,00,000",
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="header">
          <h2>Admin Dashboard</h2>
          <p>Manage pending applications and approved loans.</p>
        </div>

        <div className="grid-container">
          {/* Pending Applications */}
          <div className="card">
            <h3>Pending Applications</h3>
            <ul className="application-list">
              {pendingApplications.map((application) => (
                <li key={application.id}>
                  <div className="list-item">
                    <span className="name">{application.name}</span>
                    <span className="details">
                      {`Category: ${application.loanCategory}, Amount: ${application.amount}`}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <button className="view-button">View All Applications</button>
          </div>

          {/* Approved Loans */}
          <div className="card">
            <h3>Approved Loans</h3>
            <p>
              <strong>Total Approved:</strong> 15 Loans
            </p>
            <p>
              <strong>Total Amount:</strong> PKR 50,00,000
            </p>
            <button className="view-button">View Approved Loans</button>
          </div>

          {/* Generate Loan Report */}
          <div className="report-container">
            <button className="generate-report-button">
              Generate Loan Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
