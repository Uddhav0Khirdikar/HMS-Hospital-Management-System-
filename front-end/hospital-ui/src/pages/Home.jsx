import "./Home.css";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      {/* ================= HERO SECTION ================= */}
      <section className="home-hero">
        <div className="container">
          <div className="row align-items-center min-vh-75 py-5 g-5">
            {/* Left Side */}
            <div className="col-12 col-lg-7 text-start">
              <div className="badge-pill-header">
                <i className="bi bi-shield-plus text-primary"></i> Leading Healthcare Provider
              </div>

              <h1 className="display-4 fw-extrabold text-dark lh-sm">
                Quality Healthcare
                <br />
                <span className="text-primary">Made Simple & Accessible</span>
              </h1>

              <p className="lead text-muted mt-3 mb-4">
                Schedule consultations, connect with board-certified physicians, and manage hospital
                admissions with an intuitive, unified healthcare management system.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <button
                  className="btn btn-primary btn-lg px-4 shadow"
                  onClick={() => navigate("/appointments")}
                >
                  <i className="bi bi-calendar-check me-2"></i> Book Appointment
                </button>

                <button
                  className="btn btn-outline-primary btn-lg px-4"
                  onClick={() => navigate("/doctors")}
                >
                  <i className="bi bi-person-badge me-2"></i> Find Doctors
                </button>

                <button
                  className="btn btn-outline-secondary btn-lg px-4 text-dark"
                  style={{ borderColor: "#cbd5e1" }}
                  onClick={() => navigate("/patients")}
                >
                  <i className="bi bi-people me-2"></i> Patient Records
                </button>

                <button
                  className="btn btn-outline-secondary btn-lg px-4 text-dark"
                  style={{ borderColor: "#cbd5e1" }}
                  onClick={() => navigate("/appointment-management")}
                >
                  <i className="bi bi-card-checklist me-2"></i> Manage Schedule
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className="col-12 col-lg-5 text-center">
              <div className="home-card p-4 p-md-5 rounded-4 shadow-sm bg-white border">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-4 shadow-sm"
                  style={{
                    width: "80px",
                    height: "80px",
                    background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
                    color: "#0284c7",
                  }}
                >
                  <i className="bi bi-hospital fs-1"></i>
                </div>

                <h3 className="fw-bold text-dark mt-2 mb-2">Modern Healthcare</h3>

                <p className="text-muted small mb-4">
                  Streamlined patient admissions, digital medical records, and instantaneous appointment
                  confirmations.
                </p>

                <div className="d-flex justify-content-around border-top pt-3 text-start">
                  <div>
                    <strong className="d-block text-dark fw-bold">24/7</strong>
                    <small className="text-muted">Emergency</small>
                  </div>
                  <div className="border-start ps-3">
                    <strong className="d-block text-primary fw-bold">100%</strong>
                    <small className="text-muted">Digital Records</small>
                  </div>
                  <div className="border-start ps-3">
                    <strong className="d-block text-success fw-bold">Fast</strong>
                    <small className="text-muted">OPD Booking</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}
      <section className="services-section py-5">
        <div className="container">
          {/* Section Heading */}
          <div className="text-center mb-5">
            <div className="badge-pill-header mx-auto">
              <i className="bi bi-heart-pulse text-primary"></i> Comprehensive Services
            </div>

            <h2 className="services-title">Healthcare Made Simpler</h2>

            <p className="text-muted">
              Everything required to manage patient care and clinic workflows from one unified terminal.
            </p>
          </div>

          {/* Service Cards */}
          <div className="row g-4">
            {/* Doctor Consultation */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="service-card h-100 p-4 text-center">
                <div className="service-icon">
                  <i className="bi bi-person-badge text-primary fs-2"></i>
                </div>

                <h4 className="mt-3">Physician Consultation</h4>

                <p className="text-muted">
                  Connect with certified specialists across Cardiology, Neurology, Orthopedics, and General
                  Medicine.
                </p>

                <button
                  className="btn btn-outline-primary mt-auto"
                  onClick={() => navigate("/doctors")}
                >
                  Browse Doctors <i className="bi bi-arrow-right ms-1"></i>
                </button>
              </div>
            </div>

            {/* Appointment Booking */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="service-card h-100 p-4 text-center">
                <div className="service-icon">
                  <i className="bi bi-calendar-check text-primary fs-2"></i>
                </div>

                <h4 className="mt-3">Instant Booking</h4>

                <p className="text-muted">
                  Reserve convenient time slots with attending physicians with real-time schedule conflict
                  prevention.
                </p>

                <button
                  className="btn btn-outline-primary mt-auto"
                  onClick={() => navigate("/appointments")}
                >
                  Book Appointment <i className="bi bi-arrow-right ms-1"></i>
                </button>
              </div>
            </div>

            {/* Patient Care */}
            <div className="col-12 col-md-6 col-lg-4">
              <div className="service-card h-100 p-4 text-center">
                <div className="service-icon">
                  <i className="bi bi-people text-primary fs-2"></i>
                </div>

                <h4 className="mt-3">Electronic Records</h4>

                <p className="text-muted">
                  Organize patient demographics, blood markers, medical diagnosis records, and emergency
                  contacts safely.
                </p>

                <button
                  className="btn btn-outline-primary mt-auto"
                  onClick={() => navigate("/patients")}
                >
                  View Patients <i className="bi bi-arrow-right ms-1"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="why-section py-5">
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Left */}
            <div className="col-12 col-md-6 text-start">
              <div className="badge-pill-header">
                <i className="bi bi-award-fill text-primary"></i> Clinical Excellence
              </div>

              <h2 className="why-title">Healthcare Management You Can Rely On</h2>

              <p className="text-muted mt-3">
                Our Hospital Management System eliminates booking bottlenecks, minimizes patient wait times,
                and centralizes clinical documentation for superior medical service.
              </p>
            </div>

            {/* Right */}
            <div className="col-12 col-md-6">
              <div className="why-item">
                <span className="why-icon">
                  <i className="bi bi-check2"></i>
                </span>
                <div className="text-start">
                  <h5>Certified Healthcare Specialists</h5>
                  <p className="text-muted">
                    Access experienced medical directors and qualified consulting doctors.
                  </p>
                </div>
              </div>

              <div className="why-item">
                <span className="why-icon">
                  <i className="bi bi-check2"></i>
                </span>
                <div className="text-start">
                  <h5>Seamless Outpatient Booking</h5>
                  <p className="text-muted">
                    Schedule, reassign, complete, and track consultations with zero friction.
                  </p>
                </div>
              </div>

              <div className="why-item">
                <span className="why-icon">
                  <i className="bi bi-check2"></i>
                </span>
                <div className="text-start">
                  <h5>Structured Health Records</h5>
                  <p className="text-muted">
                    Maintain secure electronic patient medical profiles and history.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATISTICS SECTION ================= */}
      <section className="stats-section py-5">
        <div className="container">
          <div className="row text-center g-4">
            <div className="col-6 col-md-3">
              <div className="stat-item">
                <h2>500+</h2>
                <p>Patients Served</p>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="stat-item">
                <h2>50+</h2>
                <p>Specialist Doctors</p>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="stat-item">
                <h2>1,200+</h2>
                <p>Consultations</p>
              </div>
            </div>

            <div className="col-6 col-md-3">
              <div className="stat-item">
                <h2>24/7</h2>
                <p>Hospital Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="cta-section py-5">
        <div className="container">
          <div className="cta-card text-center">
            <h2>Ready to Streamline Your Healthcare?</h2>

            <p>
              Book an appointment with our specialist physicians and experience modernized outpatient
              care.
            </p>

            <button
              className="btn btn-primary btn-lg px-5 shadow"
              onClick={() => navigate("/appointments")}
            >
              <i className="bi bi-calendar2-plus me-2"></i> Book an Appointment
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
