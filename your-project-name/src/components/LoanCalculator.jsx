import React, { useState } from "react";
import ProceedPopup from "./ProceedPopup";
import "../styles/LoanCalculator.css";

const LoanCalculator = () => {
  const [loanCategory, setLoanCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [initialDeposit, setInitialDeposit] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [calculatedLoan, setCalculatedLoan] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const loanCategories = [
    {
      id: 1,
      name: "Wedding Loans",
      subcategories: [
        { name: "Valima", maxLoan: 500000, loanPeriod: 3 },
        { name: "Furniture", maxLoan: 500000, loanPeriod: 3 },
        { name: "Valima Food", maxLoan: 500000, loanPeriod: 3 },
        { name: "Jahez", maxLoan: 500000, loanPeriod: 3 },
      ],
    },
    {
      id: 2,
      name: "Home Construction Loans",
      subcategories: [
        { name: "Structure", maxLoan: 1000000, loanPeriod: 5 },
        { name: "Finishing", maxLoan: 1000000, loanPeriod: 5 },
        { name: "Loan", maxLoan: 1000000, loanPeriod: 5 },
      ],
    },
    {
      id: 3,
      name: "Business Startup Loans",
      subcategories: [
        { name: "Buy Stall", maxLoan: 1000000, loanPeriod: 5 },
        { name: "Advance Rent for Shop", maxLoan: 1000000, loanPeriod: 5 },
        { name: "Shop Assets", maxLoan: 1000000, loanPeriod: 5 },
        { name: "Shop Machinery", maxLoan: 1000000, loanPeriod: 5 },
      ],
    },
    {
      id: 4,
      name: "Education Loans",
      subcategories: [
        { name: "University Fees", maxLoan: null, loanPeriod: 4 },
        { name: "Child Fees Loan", maxLoan: null, loanPeriod: 4 },
      ],
    },
  ];

  const calculateLoan = () => {
    if (loanCategory && subCategory && loanAmount && initialDeposit !== "") {
      const maxLoan = subCategory.maxLoan;
      const totalLoan =
        Number.parseFloat(loanAmount) - Number.parseFloat(initialDeposit);
      const monthlyInstallment = totalLoan / (subCategory.loanPeriod * 12);

      setCalculatedLoan({
        totalLoan,
        monthlyInstallment,
        loanPeriod: subCategory.loanPeriod,
      });
    }
  };

  return (
    <div className="loan-calculator">
      <header className="header">
        <div className="container">
          <h1>Saylani Microfinance</h1>
          <nav>
            <button>Home</button>
            <button>About</button>
            <button>Contact</button>
          </nav>
        </div>
      </header>

      <section className="calculator-section">
        <div className="container">
          <div className="calculator-card">
            <h2>Loan Calculator</h2>
            <div className="form-group">
              <label>Loan Category</label>
              <select
                value={loanCategory?.name || ""}
                onChange={(e) => {
                  const selectedCategory = loanCategories.find(
                    (category) => category.name === e.target.value
                  );
                  setLoanCategory(selectedCategory);
                  setSubCategory(null);
                  setCalculatedLoan(null);
                }}
              >
                <option value="" disabled>
                  Select a category
                </option>
                {loanCategories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {loanCategory && (
              <>
                <div className="form-group">
                  <label>Subcategory</label>
                  <select
                    value={subCategory?.name || ""}
                    onChange={(e) => {
                      const selectedSub = loanCategory.subcategories.find(
                        (sub) => sub.name === e.target.value
                      );
                      setSubCategory(selectedSub);
                      setCalculatedLoan(null);
                    }}
                  >
                    <option value="" disabled>
                      Select a subcategory
                    </option>
                    {loanCategory.subcategories.map((sub, index) => (
                      <option key={index} value={sub.name}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Loan Amount (PKR)</label>
                  <input
                    type="number"
                    min="0"
                    style={{ width: "98%" }}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Initial Deposit (PKR)</label>
                  <input
                    type="number"
                    style={{ width: "98%" }}
                    min="0"
                    value={initialDeposit}
                    onChange={(e) => setInitialDeposit(e.target.value)}
                  />
                </div>
                <button
                  className="calculate-btn"
                  onClick={calculateLoan}
                  disabled={
                    !subCategory || loanAmount === "" || initialDeposit === ""
                  }
                >
                  Calculate Loan
                </button>
              </>
            )}

            {calculatedLoan && (
              <>
                <div
                  style={{ paddingBottom: "15px", textAlign: "center" }}
                  className="loan-details"
                >
                  <h2>Loan Details</h2>
                  <p>
                    <strong>Total Loan:</strong>{" "}
                    {calculatedLoan.totalLoan.toFixed(0)} PKR
                  </p>
                  <p>
                    <strong>Monthly Installment:</strong>{" "}
                    {calculatedLoan.monthlyInstallment.toFixed(0)} PKR
                  </p>
                  <p>
                    <strong>Loan Period:</strong> {calculatedLoan.loanPeriod}{" "}
                    years
                  </p>
                </div>
                <button
                  className="proceed-btn"
                  onClick={() => setPopupOpen(true)}
                >
                  Proceed
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      <ProceedPopup
        open={popupOpen}
        onClose={() => setPopupOpen(false)}
        calculatedLoan={calculatedLoan}
      />
    </div>
  );
};

export default LoanCalculator;
