import React from "react";
import { Link } from "react-router-dom";

export const Homework: React.FC = () => {
  return (
    <div className="examples-container">
      <h2>Homework Exercises</h2>
      <div className="examples-grid">
        <Link to="/homework/collapsible-tree">Collapsible Tree</Link>
        <Link to="/homework/debounced-search">Debounced Search</Link>
        <Link to="/homework/email-validation">Email Validation</Link>
        <Link to="/homework/form-autosave">Form Autosave</Link>
        <Link to="/homework/mouse-position">Mouse Position</Link>
        <Link to="/homework/network-status">Network Status</Link>
        <Link to="/homework/resize-observer">Resize Observer</Link>
        <Link to="/homework/typing-effect">Typing Effect</Link>
      </div>
    </div>
  );
};
