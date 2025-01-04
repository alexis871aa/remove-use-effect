import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const Layout: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <div className="app">
      <nav className="navigation">
        <h1>useEffect Examples</h1>
        <div className="nav-links">
          <Link to="/wrong" className={isActive('/wrong') ? 'active' : ''}>
            Wrong Patterns
          </Link>
          <Link to="/semi" className={isActive('/semi') ? 'active' : ''}>
            Semi-Correct
          </Link>
          <Link to="/correct" className={isActive('/correct') ? 'active' : ''}>
            Correct Usage
          </Link>
          <Link to="/homework" className={isActive('/homework') ? 'active' : ''}>
            Homework
          </Link>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
