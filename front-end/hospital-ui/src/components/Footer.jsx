import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer-section mt-auto">
      <div className="container py-5">
        <div className="row g-4 g-lg-5">
          {/* Hospital Brand Column (MediCare Section) */}
          <div className="col-12 col-md-5 col-lg-4">
            <div className="d-flex align-items-center gap-2.5 mb-3">
              <div
                className="d-flex align-items-center justify-content-center text-white rounded-3 shadow-sm flex-shrink-0"
                style={{
                  width: "44px",
                  height: "44px",
                  background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
                }}
              >
                <i className="bi bi-hospital fs-4"></i>
              </div>
              <span className="fw-bold fs-3 text-white lh-1">
                Medi<span className="text-primary">Care</span> HMS
              </span>
            </div>

            {/* MediCare Section Description - White Text */}
            <p className="text-white mb-3.5 pe-lg-4 lh-base" style={{ fontSize: "0.95rem" }}>
              A comprehensive clinical management and patient scheduling platform engineered to streamline
              hospital administration, outpatient bookings, and modern healthcare delivery.
            </p>

            {/* Certification Badges */}
            <div className="d-flex flex-wrap gap-2 pt-1">
              <span
                className="badge text-white px-3 py-2 rounded-pill fw-medium d-inline-flex align-items-center gap-1.5"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  fontSize: "0.82rem",
                }}
              >
                <i className="bi bi-shield-check text-success fs-6"></i> HIPAA Compliant
              </span>
              <span
                className="badge text-white px-3 py-2 rounded-pill fw-medium d-inline-flex align-items-center gap-1.5"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  fontSize: "0.82rem",
                }}
              >
                <i className="bi bi-activity text-info fs-6"></i> 24/7 Live Operations
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="col-6 col-md-3 col-lg-2">
            <h5 className="text-white fw-bold mb-3.5 fs-5" style={{ letterSpacing: "0.02em" }}>
              Quick Links
            </h5>
            <ul className="list-unstyled d-flex flex-column gap-2.5 small">
              <li>
                <Link to="/" className="text-decoration-none text-white hover-primary d-inline-flex align-items-center gap-2 fw-medium">
                  <i className="bi bi-chevron-right text-primary small"></i> Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-decoration-none text-white hover-primary d-inline-flex align-items-center gap-2 fw-medium">
                  <i className="bi bi-chevron-right text-primary small"></i> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-decoration-none text-white hover-primary d-inline-flex align-items-center gap-2 fw-medium">
                  <i className="bi bi-chevron-right text-primary small"></i> Doctors Roster
                </Link>
              </li>
              <li>
                <Link to="/patients" className="text-decoration-none text-white hover-primary d-inline-flex align-items-center gap-2 fw-medium">
                  <i className="bi bi-chevron-right text-primary small"></i> Patient Records
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-decoration-none text-white hover-primary d-inline-flex align-items-center gap-2 fw-medium">
                  <i className="bi bi-chevron-right text-primary small"></i> Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/appointment-management" className="text-decoration-none text-white hover-primary d-inline-flex align-items-center gap-2 fw-medium">
                  <i className="bi bi-chevron-right text-primary small"></i> Manage Schedule
                </Link>
              </li>
            </ul>
          </div>

          {/* Clinical Modules */}
          <div className="col-6 col-md-4 col-lg-3">
            <h5 className="text-white fw-bold mb-3.5 fs-5" style={{ letterSpacing: "0.02em" }}>
              Clinical Modules
            </h5>
            <ul className="list-unstyled d-flex flex-column gap-2.5 small">
              <li>
                <Link to="/doctors" className="text-decoration-none text-white hover-primary d-inline-flex align-items-center gap-2 fw-medium">
                  <i className="bi bi-chevron-right text-primary small"></i> Physician Directory
                </Link>
              </li>
              <li>
                <Link to="/patients" className="text-decoration-none text-white hover-primary d-inline-flex align-items-center gap-2 fw-medium">
                  <i className="bi bi-chevron-right text-primary small"></i> Outpatient Records
                </Link>
              </li>
              <li>
                <Link to="/appointment-management" className="text-decoration-none text-white hover-primary d-inline-flex align-items-center gap-2 fw-medium">
                  <i className="bi bi-chevron-right text-primary small"></i> Consultation Roster
                </Link>
              </li>
              <li>
                <span className="text-white d-inline-flex align-items-center gap-2 fw-medium">
                  <i className="bi bi-chevron-right text-primary small"></i> Emergency Triage Desk
                </span>
              </li>
            </ul>
          </div>

          {/* Emergency & Support Contact */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="text-white fw-bold mb-3.5 fs-5" style={{ letterSpacing: "0.02em" }}>
              Emergency & Helpdesk
            </h5>
            <div className="d-flex flex-column gap-3 small text-white">
              <div
                className="p-3.5 rounded-3 d-flex align-items-center gap-3 shadow-sm"
                style={{
                  background: "linear-gradient(135deg, rgba(239, 68, 68, 0.18) 0%, rgba(220, 38, 38, 0.28) 100%)",
                  border: "1.5px solid rgba(239, 68, 68, 0.4)",
                }}
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center text-white flex-shrink-0"
                  style={{ width: "42px", height: "42px", background: "#ef4444" }}
                >
                  <i className="bi bi-telephone-inbound-fill fs-5"></i>
                </div>
                <div>
                  <strong className="d-block lh-1 text-white fs-6">Emergency Hotline: 112</strong>
                  <small className="text-white-50 mt-1 d-block">24/7 Critical Response Unit</small>
                </div>
              </div>

              <div className="d-flex align-items-center gap-2.5 mt-1">
                <i className="bi bi-envelope-fill text-primary fs-5"></i>
                <span className="text-white fw-medium">support@medicare-hms.com</span>
              </div>
              <div className="d-flex align-items-center gap-2.5">
                <i className="bi bi-geo-alt-fill text-primary fs-5"></i>
                <span className="text-white fw-medium">Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar with System Health Indicator */}
      <div className="footer-bottom py-3.5 border-top border-secondary border-opacity-25" style={{ background: "rgba(0, 0, 0, 0.25)" }}>
        <div className="container">
          <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2 text-center text-md-start">
            <p className="text-white mb-0 small" style={{ opacity: 0.9 }}>
              © {new Date().getFullYear()} MediCare Hospital Management System. All clinical rights reserved.
            </p>
            <div className="d-flex align-items-center gap-2 small text-white" style={{ opacity: 0.9 }}>
              <span className="status-dot bg-success" style={{ width: "8px", height: "8px" }}></span>
              <span>All Clinical Services Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;