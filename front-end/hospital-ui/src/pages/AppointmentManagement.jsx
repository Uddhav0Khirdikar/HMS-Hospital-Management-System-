import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentList from "../components/AppointmentList";
import { getAllAppointments } from "../services/appointmentService";

function AppointmentManagement() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    setLoading(true);
    getAllAppointments()
      .then((response) => {
        setAppointments(response.data || []);
      })
      .catch((error) => {
        console.error("Failed to load appointments:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const bookedCount = appointments.filter((a) => a.status === "BOOKED").length;
  const completedCount = appointments.filter((a) => a.status === "COMPLETED").length;
  const cancelledCount = appointments.filter((a) => a.status === "CANCELLED").length;

  return (
    <div className="animate-fade-in">
      {/* Header Banner */}
      <div className="page-header-banner">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <div className="badge-pill-header">
                <i className="bi bi-calendar2-range"></i> Master Roster
              </div>
              <h1 className="h2 fw-bold text-dark mb-1">Appointment Management</h1>
              <p className="text-muted mb-0">
                Track, filter, and modify consultation appointments across all hospital departments.
              </p>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/appointments")}
              >
                <i className="bi bi-calendar-plus me-1"></i> Book New Appointment
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate("/dashboard")}
              >
                <i className="bi bi-speedometer2 me-1"></i> Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-5">
        {/* Metric Cards Row */}
        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card p-3 border shadow-sm h-100">
              <span className="text-muted small fw-semibold text-uppercase">Total Bookings</span>
              <h3 className="fw-bold text-dark mb-0 mt-1">{appointments.length}</h3>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card p-3 border shadow-sm h-100" style={{ borderLeft: "4px solid #2563eb" }}>
              <span className="text-muted small fw-semibold text-uppercase">Active / Booked</span>
              <h3 className="fw-bold text-primary mb-0 mt-1">{bookedCount}</h3>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card p-3 border shadow-sm h-100" style={{ borderLeft: "4px solid #10b981" }}>
              <span className="text-muted small fw-semibold text-uppercase">Completed</span>
              <h3 className="fw-bold text-success mb-0 mt-1">{completedCount}</h3>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card p-3 border shadow-sm h-100" style={{ borderLeft: "4px solid #ef4444" }}>
              <span className="text-muted small fw-semibold text-uppercase">Cancelled</span>
              <h3 className="fw-bold text-danger mb-0 mt-1">{cancelledCount}</h3>
            </div>
          </div>
        </div>

        {/* Appointments Table Section */}
        <div className="card border shadow-sm p-4">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading appointments...</span>
              </div>
              <p className="text-muted small mt-2">Loading appointment records...</p>
            </div>
          ) : (
            <AppointmentList
              appointments={appointments}
              onAppointmentUpdated={loadAppointments}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AppointmentManagement;