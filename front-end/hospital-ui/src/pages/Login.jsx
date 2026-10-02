import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState("");

    const handleLogin = (e) => {

        e.preventDefault();
        setLoginError("");

        if (!username.trim() || !password.trim()) {
            setLoginError("Please enter both username and password.");
            return;
        }

        setIsLoading(true);

        axios.post("http://localhost:8080/admin/login", {
            username: username,
            password: password
        })
            .then((response) => {

                console.log("LOGIN RESPONSE:", response.data, typeof response.data);

                if (response.data === true || response.data === "true") {
                    
                    localStorage.setItem("isLoggedIn", "true");
                    navigate("/");

                } else {
                    setLoginError("Invalid username or password. Please try again.");
                }

            })
            .catch((error) => {
                console.log(error);
                setLoginError("Unable to connect to authentication server. Please ensure the backend is running.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="login-wrapper">

            {/* Ambient Background Decorative Shapes */}
            <div className="login-bg-shape-1"></div>
            <div className="login-bg-shape-2"></div>

            <div className="container login-page">

                <div className="row justify-content-center">

                    <div className="col-11 col-sm-9 col-md-7 col-lg-5 col-xl-4">

                        <div className="login-card">

                            {/* Header Section */}
                            <div className="login-header">

                                <div className="login-icon-box">
                                    <svg
                                        width="30"
                                        height="30"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 4v16m-8-8h16" />
                                    </svg>
                                </div>

                                <div className="login-badge">
                                    Hospital Admin Portal
                                </div>

                                <h2 className="login-title">
                                    Welcome Back
                                </h2>

                                <p className="login-subtitle">
                                    Enter your credentials to access the management portal
                                </p>

                            </div>

                            {/* Form Section */}
                            <form onSubmit={handleLogin}>
                                {loginError && (
                                    <div
                                        className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3 mb-3 rounded-3 small"
                                        role="alert"
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="12" y1="8" x2="12" y2="12" />
                                            <line x1="12" y1="16" x2="12.01" y2="16" />
                                        </svg>
                                        <div>{loginError}</div>
                                    </div>
                                )}

                                {/* Username Field */}
                                <div className="login-form-group">
                                    <label className="login-label" htmlFor="username">
                                        Username
                                    </label>
                                    <div className="login-input-wrapper">
                                        <span className="login-input-icon">
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                        </span>
                                        <input
                                            id="username"
                                            type="text"
                                            className="login-input"
                                            placeholder="Enter your username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            autoComplete="username"
                                        />
                                    </div>
                                </div>

                                {/* Password Field */}
                                <div className="login-form-group">
                                    <label className="login-label" htmlFor="password">
                                        Password
                                    </label>
                                    <div className="login-input-wrapper">
                                        <span className="login-input-icon">
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                            </svg>
                                        </span>
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            className="login-input has-toggle"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="current-password"
                                        />
                                        <button
                                            type="button"
                                            className="login-toggle-btn"
                                            onClick={() => setShowPassword(!showPassword)}
                                            title={showPassword ? "Hide password" : "Show password"}
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? (
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                                    <line x1="1" y1="1" x2="23" y2="23" />
                                                </svg>
                                            ) : (
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Login Submit Button */}
                                <button
                                    type="submit"
                                    className="login-submit-btn"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            <span>Authenticating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Sign In</span>
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                                <polyline points="10 17 15 12 10 7" />
                                                <line x1="15" y1="12" x2="3" y2="12" />
                                            </svg>
                                        </>
                                    )}
                                </button>

                            </form>

                            {/* Security Badge Footer */}
                            <div className="login-footer">
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                <span>256-Bit SSL Secured • Authorized Admin Access</span>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;