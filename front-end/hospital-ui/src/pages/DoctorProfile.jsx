import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoctorById } from "../services/doctorServices";

function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getDoctorById(id)
      .then((response) => {
        setDoctor(response.data);
      })
      .catch((error) => {
        console.error("Failed to load doctor profile:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading doctor...</span>
        </div>
        <p className="text-muted small mt-2">Loading medical practitioner profile...</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="container py-5 text-center">
        <div className="card p-5 border shadow-sm max-w-md mx-auto">
          <i className="bi bi-exclamation-triangle-fill text-warning fs-1 mb-3"></i>
          <h4>Doctor Not Found</h4>
          <p className="text-muted">The requested doctor profile does not exist or has been removed.</p>
          <Link to="/doctors" className="btn btn-primary mx-auto">
            <i className="bi bi-arrow-left me-1"></i> Back to Doctors
          </Link>
        </div>
      </div>
    );
  }

  const initials = (doctor.name || "Dr")
    .replace(/^Dr\.?\s*/i, "")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="animate-fade-in pb-5">
      {/* Breadcrumb Header Banner */}
      <div className="page-header-banner">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2 small">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none text-muted">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/doctors" className="text-decoration-none text-muted">
                  Doctors
                </Link>
              </li>
              <li className="breadcrumb-item active text-primary fw-semibold" aria-current="page">
                Dr. {doctor.name}
              </li>
            </ol>
          </nav>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <div className="badge-pill-header">
                <i className="bi bi-patch-check-fill text-primary"></i> Certified Physician
              </div>
              <h1 className="h2 fw-bold text-dark mb-0">Doctor Profile</h1>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate("/doctors")}
              >
                <i className="bi bi-arrow-left me-1"></i> All Doctors
              </button>
              <button
                className="btn btn-outline-warning"
                onClick={() => navigate(`/doctors/edit/${doctor.id}`)}
              >
                <i className="bi bi-pencil-square me-1"></i> Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row g-4">
          {/* Left Column: Doctor Profile Card */}
          <div className="col-12 col-lg-4">
            <div className="card border shadow-sm p-4 text-center sticky-top" style={{ top: "110px" }}>
              <div
                className="avatar-circle avatar-blue mx-auto mb-3"
                style={{ width: "96px", height: "96px", fontSize: "2.2rem" }}
              >
                {initials}
              </div>

              <h3 className="fw-bold text-dark mb-1">Dr. {doctor.name}</h3>
              <div className="mb-2">
                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-1.5 rounded-pill fw-semibold">
                  {doctor.specialization}
                </span>
              </div>
              <p className="text-muted small mb-3">{doctor.qualification}</p>

              <div className="d-inline-flex align-items-center gap-1.5 bg-success bg-opacity-10 text-success px-3 py-1 rounded-pill small fw-semibold mb-4">
                <span className="status-dot bg-success"></span>
                <span>Active & Accepting Appointments</span>
              </div>

              <button
                className="btn btn-primary btn-lg w-100 py-3 shadow mb-3"
                onClick={() => navigate(`/appointments?doctorId=${doctor.id}`)}
              >
                <i className="bi bi-calendar-check me-2"></i> Book Appointment
              </button>

              <div className="p-3 bg-light rounded-3 text-start small border">
                <div className="d-flex justify-content-between py-1 border-bottom">
                  <span className="text-muted">Physician ID</span>
                  <span className="fw-bold text-dark font-monospace">#{doctor.id}</span>
                </div>
                <div className="d-flex justify-content-between py-1 border-bottom">
                  <span className="text-muted">Experience</span>
                  <span className="fw-bold text-dark">{doctor.experience || 0} Years</span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span className="text-muted">Department</span>
                  <span className="fw-bold text-primary">{doctor.specialization}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Credentials & Contact Info */}
          <div className="col-12 col-lg-8">
            <div className="d-flex flex-column gap-4">
              {/* Clinical Details Card */}
              <div className="card border shadow-sm p-4">
                <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-info-circle-fill text-primary"></i> Professional Credentials
                </h5>

                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border h-100">
                      <small className="text-muted d-block text-uppercase fw-semibold mb-1">
                        Primary Specialty
                      </small>
                      <h6 className="fw-bold text-dark mb-0">{doctor.specialization}</h6>
                      <small className="text-muted">Hospital Clinical Practice</small>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border h-100">
                      <small className="text-muted d-block text-uppercase fw-semibold mb-1">
                        Board Certification / Degree
                      </small>
                      <h6 className="fw-bold text-dark mb-0">{doctor.qualification}</h6>
                      <small className="text-muted">Verified Medical Council Registry</small>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border h-100">
                      <small className="text-muted d-block text-uppercase fw-semibold mb-1">
                        Clinical Experience
                      </small>
                      <h6 className="fw-bold text-dark mb-0">{doctor.experience} Years Active</h6>
                      <small className="text-muted">Inpatient & Outpatient Consultation</small>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border h-100">
                      <small className="text-muted d-block text-uppercase fw-semibold mb-1">
                        Consultation Mode
                      </small>
                      <h6 className="fw-bold text-dark mb-0">In-Person & Clinic</h6>
                      <small className="text-muted">Main Hospital OPD Block</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Communication Channels */}
              <div className="card border shadow-sm p-4">
                <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-headset text-primary"></i> Direct Contact Information
                </h5>

                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 border">
                      <div className="avatar-circle avatar-blue" style={{ width: "44px", height: "44px" }}>
                        <i className="bi bi-telephone-fill"></i>
                      </div>
                      <div>
                        <small className="text-muted d-block fw-semibold">Official Phone</small>
                        <span className="fw-bold text-dark">{doctor.phone || "Not specified"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-6">
                    <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 border">
                      <div className="avatar-circle avatar-teal" style={{ width: "44px", height: "44px" }}>
                        <i className="bi bi-envelope-fill"></i>
                      </div>
                      <div>
                        <small className="text-muted d-block fw-semibold">Email Address</small>
                        <span className="fw-bold text-dark">{doctor.email || "Not specified"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Patient Guidelines Note */}
              <div className="card border shadow-sm p-4 bg-primary bg-opacity-10 border-primary">
                <div className="d-flex gap-3">
                  <i className="bi bi-lightbulb-fill text-primary fs-3"></i>
                  <div>
                    <h6 className="fw-bold text-primary mb-1">Appointment Advisory</h6>
                    <p className="text-dark small mb-0">
                      Patients are encouraged to bring previous clinical diagnostic files, blood test
                      reports, and prescription histories when arriving for consultations with Dr. {doctor.name}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;