import React from "react";
import { Link } from "react-router-dom";

export const SemiExamples: React.FC = () => {
  return (
    <div className="examples-container">
      <h2>Semi-Correct Examples</h2>
      <div className="examples-grid">
        <Link to="/semi/async-loading">Async Loading</Link>
        <Link to="/semi/element-observer">Element Observer</Link>
        <Link to="/semi/local-storage">Local Storage</Link>
      </div>
    </div>
  );
};
