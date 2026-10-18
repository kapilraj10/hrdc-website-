import React, { useMemo, useState, useEffect } from "react";
import {
  Speedometer2,
  HouseDoor,
  CashStack,
  PersonBadge
} from "react-bootstrap-icons";
import { useNavigate, useLocation } from 'react-router-dom'
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  const items = useMemo(() => [
    { id: 'dashboard', label: 'Dashboard', icon: <Speedometer2 />, path: '/dashboard' },
    { id: 'camps', label: 'Camps', icon: <HouseDoor />, path: '/camp' },
    { id: 'advance', label: 'Advance', icon: <CashStack />, path: '/advance', badge: 'New' },
    { id: 'admin', label: 'Admin', icon: <PersonBadge />, path: '/admin' }
  ], [])

  const handleNav = (path) => (e) => {
    e.preventDefault()
    if (location.pathname !== path) navigate(path)
  }

  const toggleCollapsed = () => setCollapsed((c) => !c)

  useEffect(() => {
    // add or remove a class on document.body so layout (container widths) can adapt
    const cls = 'sidebar-collapsed'
    if (collapsed) document.body.classList.add(cls)
    else document.body.classList.remove(cls)

    return () => { document.body.classList.remove(cls) }
  }, [collapsed])

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} aria-label="Main navigation">
      <div className="sidebar-top">
        <div className="brand" onClick={() => navigate('/dashboard')} role="button" tabIndex={0}>
          <div className="brand-logo" aria-hidden>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="24" height="24" rx="6" fill="#eef2ff" />
            </svg>
          </div>
          <div className="brand-texts">
            <div className="brand-title">HRDC</div>
            <div className="brand-sub">Admin</div>
          </div>
        </div>

        <button className="collapse-btn" onClick={toggleCollapsed} aria-pressed={collapsed} aria-label="Toggle sidebar">
          {collapsed ? '»' : '«'}
        </button>
      </div>

      <nav className="sidebar-menu" role="menu">
        <ul className="menu-list">
          {items.map((it, idx) => {
            const active = location.pathname === it.path
            return (
              <li key={it.id} className={`menu-item ${active ? 'active' : ''}`} style={{ "--item-index": idx }}>
                <button
                  className="menu-link"
                  onClick={handleNav(it.path)}
                  aria-current={active ? 'page' : undefined}
                  role="menuitem"
                  tabIndex={0}
                >
                  <div className="menu-icon">{it.icon}</div>
                  <span className="menu-label">{it.label}</span>
                  {it.badge && <span className="menu-badge badge-new">{it.badge}</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* bottom section intentionally removed */}
    </aside>
  );
};

export default React.memo(Sidebar);

