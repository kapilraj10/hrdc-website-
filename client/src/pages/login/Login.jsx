import React, { useState } from "react"
import "./Login.css"
import { loginUser } from "../../service/auth"
import toast from "react-hot-toast"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [remember, setRemember] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email || !password) {
            toast.error("Email and password are required")
            return
        }

        try {
            setLoading(true)
            const data = await loginUser(email, password, remember)
            toast.success("Login successful ")
            console.log("Login success:", data)
            // redirect to dashboard after successful login
            navigate('/dashboard', { replace: true })
        } catch (err) {
            if (err.message === "Invalid credentials") {
                toast.error("Incorrect email or password")
            } else {
                toast.error("Server error. Please try again later")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 login-page-bg">
            <div className="card shadow login-card">
                <div className="card-body p-4">
                    <h2 className="card-title text-center mb-2">Sign in</h2>
                    <p className="text-muted mb-3 text-center">
                        Welcome back — please sign in to your account
                    </p>

                    <form onSubmit={handleSubmit} noValidate>
                        {/* Email */}
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control border-end-0"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary border-start-0"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        borderTopLeftRadius: 0,
                                        borderBottomLeftRadius: 0,
                                        padding: "0.375rem 0.75rem"
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                        style={{ width: "1rem" }}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Remember */}
                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="rememberCheck"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="rememberCheck">
                                Remember me
                            </label>
                        </div>

                        {/* Submit */}
                        <div className="d-grid">
                            <button
                                className="btn btn-primary"
                                disabled={loading}
                                type="submit"
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Logging in...
                                    </>
                                ) : "Login"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login