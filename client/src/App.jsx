import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from 'react-hot-toast'
import Login from "./pages/login/Login"
import Dashboard from './components/Dashboard/Dashboard'
import Admin from './components/Dashboard/Admin/Admin'
import Camp from './components/Dashboard/Camp/Camp'
import Advance from './components/Dashboard/Advance/Advance'
import DashboardLayout from './components/Dashboard/DashboardLayout'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Dashboard layout wrapper (shows Navbar + Sidebar) */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/camp" element={<Camp />} />
            <Route path="/advance" element={<Advance />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* Toast Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: '14px',
          },
        }}
      />
    </>
  )
}

export default App
