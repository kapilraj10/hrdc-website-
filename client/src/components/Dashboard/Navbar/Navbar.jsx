import React, { useMemo } from "react";
import { useLocation } from 'react-router-dom'
import './Navbar.css';

const Navbar = ({ email, onLogout }) => {
  const location = useLocation()

  const currentRoute = useMemo(() => {
    const p = location.pathname || ''
    if (p.startsWith('/dashboard')) return 'Dashboard'
    if (p.startsWith('/camp')) return 'Camps'
    if (p.startsWith('/advance')) return 'Advance'
    if (p.startsWith('/admin')) return 'Admin'
    return ''
  }, [location.pathname])

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <a className="navbar-brand" href="#">
            <span className="brand-text">HRDC Admin</span>
          </a>
          {currentRoute && <span className="current-route ms-3">{currentRoute}</span>}
        </div>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item me-3">
              <div className="user-info">
                <i className="bi bi-person-circle user-icon"></i>
                <span className="user-email">{email}</span>
              </div>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-logout"
                onClick={onLogout}
              >
                <i className="bi bi-box-arrow-right"></i>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;