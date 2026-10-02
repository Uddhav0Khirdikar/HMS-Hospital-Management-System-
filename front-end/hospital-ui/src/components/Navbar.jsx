import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const navItemClass = ({ isActive }) =>
    `nav-link px-3.5 py-2.5 rounded-3 d-flex align-items-center gap-2 fw-semibold fs-6 transition-all ${
      isActive
        ? "text-primary bg-primary bg-opacity-10 fw-bold"
        : "text-secondary hover-primary"
    }`;

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top bg-white border-bottom shadow-sm py-3 py-lg-4"
      style={{ minHeight: "88px" }}
    >
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center gap-3 text-decoration-none py-1" to="/">
          <div
            className="d-flex align-items-center justify-content-center text-white rounded-3 shadow-sm flex-shrink-0"
            style={{
              width: "50px",
              height: "50px",
              background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
            }}
          >
            <i className="bi bi-hospital fs-3"></i>
          </div>
          <div className="d-flex flex-column text-start">
            <span className="fw-bold fs-4 text-dark lh-1" style={{ letterSpacing: "-0.02em" }}>
              Medi<span className="text-primary">Care</span>
            </span>
            <small className="text-muted fw-semibold mt-1" style={{ fontSize: "0.76rem", letterSpacing: "0.08em" }}>
              HOSPITAL MANAGEMENT SYSTEM
            </small>
          </div>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler border-0 shadow-none p-2"
          type="button"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={() => setIsNavCollapsed(!isNavCollapsed)}
        >
          <i className={`bi ${isNavCollapsed ? "bi-list" : "bi-x-lg"} fs-3 text-dark`}></i>
        </button>

        {/* Navigation Items */}
        <div className={`collapse navbar-collapse ${!isNavCollapsed ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-2 gap-lg-3 pt-2 pt-lg-0 text-start">
            <li className="nav-item">
              <NavLink to="/" end className={navItemClass} onClick={() => setIsNavCollapsed(true)}>
                <i className="bi bi-house-door fs-5"></i>
                <span>Home</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/dashboard" className={navItemClass} onClick={() => setIsNavCollapsed(true)}>
                <i className="bi bi-speedometer2 fs-5"></i>
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/doctors" className={navItemClass} onClick={() => setIsNavCollapsed(true)}>
                <i className="bi bi-person-badge fs-5"></i>
                <span>Doctors</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/patients" className={navItemClass} onClick={() => setIsNavCollapsed(true)}>
                <i className="bi bi-people fs-5"></i>
                <span>Patients</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/appointments" className={navItemClass} onClick={() => setIsNavCollapsed(true)}>
                <i className="bi bi-calendar-plus fs-5"></i>
                <span>Book</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/appointment-management" className={navItemClass} onClick={() => setIsNavCollapsed(true)}>
                <i className="bi bi-card-checklist fs-5"></i>
                <span>Manage</span>
              </NavLink>
            </li>
          </ul>

          {/* Right Action / Logout */}
          <div className="d-flex align-items-center gap-3 pt-2 pt-lg-0 border-top border-lg-0">
            {isLoggedIn ? (
              <>
                <div className="d-none d-xl-flex align-items-center gap-2 py-1.5 px-3 rounded-pill bg-light border">
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                    style={{ width: "28px", height: "28px", fontSize: "0.85rem" }}
                  >
                    <i className="bi bi-shield-lock-fill"></i>
                  </div>
                  <span className="text-dark fw-bold pe-1" style={{ fontSize: "0.88rem" }}>
                    Admin
                  </span>
                </div>
                <button
                  className="btn btn-outline-danger btn-sm px-3.5 py-2 rounded-pill d-flex align-items-center gap-2"
                  onClick={handleLogout}
                  title="Sign out of hospital portal"
                >
                  <i className="bi bi-box-arrow-right fs-6"></i>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary px-4 py-2 rounded-pill">
                <i className="bi bi-box-arrow-in-right me-1"></i> Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;