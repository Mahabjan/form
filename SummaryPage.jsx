import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data) {
    return (
      <div className="page-container">
        <div className="card">
          <h2>No data found</h2>
          <p>Please fill the form first.</p>
          <button className="primary-btn" onClick={() => navigate("/")}>
            Go to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="card">
        <div className="card-header">
          <h1>Profile Preview</h1>
          <p>Here’s what you submitted.</p>
        </div>

        <div className="summary-grid">
          <SummaryRow label="First Name" value={data.firstName} />
          <SummaryRow label="Last Name" value={data.lastName} />
          <SummaryRow label="Username" value={data.username} />
          <SummaryRow label="Email" value={data.email} />
          <SummaryRow
            label="Phone"
            value={`${data.countryCode} ${data.phone}`}
          />
          <SummaryRow label="Country" value={data.country} />
          <SummaryRow label="City" value={data.city} />
          <SummaryRow label="PAN" value={data.pan} />
          <SummaryRow label="Aadhaar" value={data.aadhaar} />
        </div>

        <div className="actions full-width">
          <button className="primary-btn" onClick={() => navigate("/")}>
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="summary-row">
      <span className="summary-label">{label}</span>
      <span className="summary-value">{value}</span>
    </div>
  );
}

export default SummaryPage;
