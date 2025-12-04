import React from "react";
import { Routes, Route } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import SummaryPage from "./SummaryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/summary" element={<SummaryPage />} />
    </Routes>
  );
}

export default App;
