import React from "react";
import { Link } from "react-router-dom";

export const WrongExamples: React.FC = () => {
  return (
    <div className="examples-container">
      <h2>Wrong Patterns</h2>
      <div className="examples-grid">
        <Link to="/wrong/loading-button">Loading Button Example</Link>
        <Link to="/wrong/countdown">Countdown Example</Link>
        <Link to="/wrong/checkbox">Checkbox List Example</Link>
        <Link to="/wrong/update-form">Update Form Example</Link>
        <Link to="/wrong/optimistic">Optimistic Update Example</Link>
      </div>
    </div>
  );
};
