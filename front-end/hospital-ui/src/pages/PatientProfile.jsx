import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPatientById } from "../services/patientServices";

function PatientProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPatientById(id)
      .then((response) => {
        setPatient(response.data);
      })
      .catch((error) => {
        console.error("Failed to load patient profile:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading patient...</span>
        </div>
        <p className="text-muted small mt-2">Loading patient health records...</p>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="container py-5 text-center">
        <div className="card p-5 border shadow-sm max-w-md mx-auto">
          <i className="bi bi-person-x-fill text-warning fs-1 mb-3"></i>
          <h4>Patient Record Not Found</h4>
          <p className="text-muted">The requested patient record does not exist or has been removed.</p>
          <Link to="/patients" className="btn btn-primary mx-auto">
            <i className="bi bi-arrow-left me-1"></i> Back to Patient Directory
          </Link>
        </div>
      </div>
    );
  }

  const initials = (patient.name || "P")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="animate-fade-in pb-5">
      {/* Header Banner */}
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
                <Link to="/patients" className="text-decoration-none text-muted">
                  Patients
                </Link>
              </li>
              <li className="breadcrumb-item active text-primary fw-semibold" aria-current="page">
                {patient.name}
              </li>
            </ol>
          </nav>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <div className="badge-pill-header">
                <i className="bi bi-clipboard2-pulse-fill"></i> Electronic Health Record
              </div>
              <h1 className="h2 fw-bold text-dark mb-0">Patient Health Profile</h1>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate("/patients")}
              >
                <i className="bi bi-arrow-left me-1"></i> All Patients
              </button>
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/appointments`)}
              >
                <i className="bi bi-calendar-plus me-1"></i> Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row g-4">
          {/* Left Column: Summary Card */}
          <div className="col-12 col-lg-4">
            <div className="card border shadow-sm p-4 text-center sticky-top" style={{ top: "110px" }}>
              <div
                className="avatar-circle avatar-teal mx-auto mb-3"
                style={{ width: "96px", height: "96px", fontSize: "2.2rem" }}
              >
                {initials}
              </div>

              <h3 className="fw-bold text-dark mb-1">{patient.name}</h3>
              <p className="text-muted small mb-2">
                Patient Record ID: <strong className="font-monospace text-dark">#{patient.id}</strong>
              </p>

              <div className="d-flex justify-content-center gap-2 mb-4">
                <span className="badge bg-light text-dark border px-3 py-1.5 rounded-pill fw-semibold">
                  {patient.gender || "Gender Unspecified"}
                </span>
                <span className="badge bg-light text-dark border px-3 py-1.5 rounded-pill fw-semibold">
                  {patient.age} Years Old
                </span>
                {patient.bloodGroup && (
                  <span className="badge bg-danger bg-opacity-10 text-danger border border-danger-subtle px-3 py-1.5 rounded-pill fw-bold">
                    <i className="bi bi-droplet-fill me-1"></i>
                    {patient.bloodGroup}
                  </span>
                )}
              </div>

              <button
                className="btn btn-primary btn-lg w-100 py-3 shadow mb-3"
                onClick={() => navigate(`/appointments`)}
              >
                <i className="bi bi-calendar-check me-2"></i> Book Appointment
              </button>

              <div className="p-3 bg-light rounded-3 text-start small border">
                <div className="d-flex justify-content-between py-1 border-bottom">
                  <span className="text-muted">Primary Phone</span>
                  <span className="fw-bold text-dark">{patient.phone || "N/A"}</span>
                </div>
                <div className="d-flex justify-content-between py-1 border-bottom">
                  <span className="text-muted">Admission Status</span>
                  <span className="badge bg-success bg-opacity-10 text-success fw-semibold">
                    Registered
                  </span>
                </div>
                <div className="d-flex justify-content-between py-1">
                  <span className="text-muted">Blood Type</span>
                  <span className="fw-bold text-danger">{patient.bloodGroup || "Not recorded"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clinical Details */}
          <div className="col-12 col-lg-8">
            <div className="d-flex flex-column gap-4">
              {/* Reported Medical Condition Card */}
              <div className="card border shadow-sm p-4">
                <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-heart-pulse-fill text-danger"></i> Clinical Condition & Diagnosis
                </h5>
                <div className="p-4 bg-light rounded-3 border">
                  <span className="text-muted small fw-semibold text-uppercase d-block mb-1">
                    Primary Medical Concern / Disease
                  </span>
                  <h4 className="fw-bold text-dark mb-2">
                    {patient.disease || "No specific active chronic condition documented"}
                  </h4>
                  <p className="text-muted small mb-0">
                    Documented during initial patient intake. Review with attending doctor during the
                    scheduled consultation for diagnostic updates and prescription therapy.
                  </p>
                </div>
              </div>

              {/* Demographics & Contact Card */}
              <div className="card border shadow-sm p-4">
                <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                  <i className="bi bi-person-lines-fill text-primary"></i> Demographics & Location
                </h5>

                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <small className="text-muted d-block text-uppercase fw-semibold mb-1">
                        Age & Gender
                      </small>
                      <h6 className="fw-bold text-dark mb-0">
                        {patient.age} Years • {patient.gender}
                      </h6>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <small className="text-muted d-block text-uppercase fw-semibold mb-1">
                        Blood Group Marker
                      </small>
                      <h6 className="fw-bold text-danger mb-0">
                        {patient.bloodGroup ? `${patient.bloodGroup} Positive/Negative` : "Unspecified"}
                      </h6>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <small className="text-muted d-block text-uppercase fw-semibold mb-1">
                        Telephone Number
                      </small>
                      <h6 className="fw-bold text-dark mb-0">
                        <i className="bi bi-telephone text-primary me-1"></i>
                        {patient.phone || "Not recorded"}
                      </h6>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="p-3 bg-light rounded-3 border">
                      <small className="text-muted d-block text-uppercase fw-semibold mb-1">
                        Permanent / Current Address
                      </small>
                      <h6 className="fw-bold text-dark mb-0 text-truncate">
                        <i className="bi bi-geo-alt text-primary me-1"></i>
                        {patient.address || "Address not provided"}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hospital Security & Privacy Notice */}
              <div className="card border shadow-sm p-4 bg-light">
                <div className="d-flex align-items-start gap-3">
                  <i className="bi bi-shield-lock-fill text-primary fs-3"></i>
                  <div>
                    <h6 className="fw-bold text-dark mb-1">HIPAA & Clinical Data Protection</h6>
                    <p className="text-muted small mb-0">
                      This medical record is strictly confidential and protected by healthcare privacy
                      laws. Access is restricted to authorized medical officers, attending physicians, and
                      hospital administration.
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

export default PatientProfile;