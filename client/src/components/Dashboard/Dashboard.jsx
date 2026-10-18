import React from 'react'
import './Dashboard.css'

const Dashboard = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to HRDC Admin Panel</p>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h4>Quick Stats</h4>
          <p>Your dashboard content goes here</p>
        </div>
        <div className="dashboard-card">
          <h4>Recent Activity</h4>
          <p>Monitor recent activities</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard