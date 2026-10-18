import React, { useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar.jsx'
import Sidebar from './Sidebar/Sidebar.jsx'
import './Dashboard.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { getCurrentUser, logoutUser } from '../../service/auth'

const DashboardLayout = () => {
    const [email, setEmail] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        let mounted = true
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser()
                if (mounted) setEmail(user.email)
            } catch (err) {
                console.error('Fetch current user failed in layout:', err)
                navigate('/', { replace: true })
            }
        }
        fetchUser()
        return () => { mounted = false }
    }, [navigate])

    const handleLogout = async () => {
        try {
            await logoutUser()
        } catch (err) {
            console.error('Logout error:', err)
        }
        localStorage.removeItem('authToken')
        navigate('/', { replace: true })
    }

    return (
        <div className="dashboard-layout">
            <div className="navbar-container">
                <Navbar email={email} onLogout={handleLogout} />
            </div>

            <div className="main-container">
                <div className="sidebar-container">
                    <Sidebar />
                </div>

                <div className="content-container">
                    <div className="content">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
