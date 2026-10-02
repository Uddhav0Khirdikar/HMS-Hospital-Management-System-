import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPatients } from "../services/patientServices";
import { getDoctors } from "../services/doctorServices";
import { getAllAppointments } from "../services/appointmentService";

function Dashboard() {
  const [patientCount, setPatientCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    setLoading(true);
    const today = new Date().toISOString().split("T")[0];

    Promise.allSettled([
      getPatients(),
      getDoctors(),
      getAllAppointments(),
    ])
      .then(([patientsRes, doctorsRes, appointmentsRes]) => {
        if (patientsRes.status === "fulfilled") {
          setPatientCount(patientsRes.value.data.length);
        }
        if (doctorsRes.status === "fulfilled") {
          setDoctorCount(doctorsRes.value.data.length);
        }
        if (appointmentsRes.status === "fulfilled") {
          const allApts = appointmentsRes.value.data;
          setAppointmentCount(allApts.length);
          const todays = allApts.filter((apt) => apt.appointmentDate === today);
          setTodayAppointments(todays);
        }
      })
      .catch((err) => console.error("Error loading dashboard data:", err))
      .finally(() => setLoading(false));
  };

  const currentDateFormatted = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container py-4 py-lg-5 animate-fade-in">
      {/* Header Banner */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4 pb-3 border-bottom">
        <div>
          <div className="badge-pill-header">
            <i className="bi bi-activity"></i> Live Hospital Status
          </div>
          <h1 className="h2 fw-bold text-dark mb-1">Operations Dashboard</h1>
          <p className="text-muted mb-0">
            Real-time overview of hospital admissions, doctor roster, and patient appointments.
          </p>
        </div>
        <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-3 border shadow-sm">
          <i className="bi bi-calendar3 text-primary"></i>
          <span className="fw-semibold text-dark small">{currentDateFormatted}</span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="row g-3 g-xl-4 mb-4">
        {/* Total Patients */}
        <div className="col-12 col-sm-6 col-xl-3">
          <Link to="/patients" className="text-decoration-none">
            <div className="stat-card-modern h-100">
              <div
                className="stat-icon-wrapper"
                style={{
                  background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
                  color: "#0284c7",
                }}
              >
                <i className="bi bi-people-fill"></i>
              </div>
              <div className="flex-grow-1">
                <span className="text-muted fw-semibold small text-uppercase" style={{ letterSpacing: "0.05em" }}>
                  Total Patients
                </span>
                <h2 className="display-6 fw-bold text-dark mb-0 mt-1">
                  {loading ? "..." : patientCount}
                </h2>
                <div className="d-flex align-items-center gap-1 mt-1 text-primary small fw-semibold">
                  <span>View records</span>
                  <i className="bi bi-arrow-right"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Total Doctors */}
        <div className="col-12 col-sm-6 col-xl-3">
          <Link to="/doctors" className="text-decoration-none">
            <div className="stat-card-modern h-100">
              <div
                className="stat-icon-wrapper"
                style={{
                  background: "linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)",
                  color: "#0d9488",
                }}
              >
                <i className="bi bi-person-badge-fill"></i>
              </div>
              <div className="flex-grow-1">
                <span className="text-muted fw-semibold small text-uppercase" style={{ letterSpacing: "0.05em" }}>
                  Active Doctors
                </span>
                <h2 className="display-6 fw-bold text-dark mb-0 mt-1">
                  {loading ? "..." : doctorCount}
                </h2>
                <div className="d-flex align-items-center gap-1 mt-1 text-teal small fw-semibold" style={{ color: "#0d9488" }}>
                  <span>View team</span>
                  <i className="bi bi-arrow-right"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Total Appointments */}
        <div className="col-12 col-sm-6 col-xl-3">
          <Link to="/appointment-management" className="text-decoration-none">
            <div className="stat-card-modern h-100">
              <div
                className="stat-icon-wrapper"
                style={{
                  background: "linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)",
                  color: "#9333ea",
                }}
              >
                <i className="bi bi-calendar2-check-fill"></i>
              </div>
              <div className="flex-grow-1">
                <span className="text-muted fw-semibold small text-uppercase" style={{ letterSpacing: "0.05em" }}>
                  All Appointments
                </span>
                <h2 className="display-6 fw-bold text-dark mb-0 mt-1">
                  {loading ? "..." : appointmentCount}
                </h2>
                <div className="d-flex align-items-center gap-1 mt-1 text-purple small fw-semibold" style={{ color: "#9333ea" }}>
                  <span>Manage all</span>
                  <i className="bi bi-arrow-right"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Today's Appointments */}
        <div className="col-12 col-sm-6 col-xl-3">
          <Link to="/appointment-management" className="text-decoration-none">
            <div className="stat-card-modern h-100">
              <div
                className="stat-icon-wrapper"
                style={{
                  background: "linear-gradient(135deg, #ecfdf5 0%, #a7f3d0 100%)",
                  color: "#059669",
                }}
              >
                <i className="bi bi-clock-history"></i>
              </div>
              <div className="flex-grow-1">
                <span className="text-muted fw-semibold small text-uppercase" style={{ letterSpacing: "0.05em" }}>
                  Today's Queue
                </span>
                <h2 className="display-6 fw-bold text-dark mb-0 mt-1">
                  {loading ? "..." : todayAppointments.length}
                </h2>
                <div className="d-flex align-items-center gap-1 mt-1 text-success small fw-semibold">
                  <span>Scheduled today</span>
                  <i className="bi bi-arrow-right"></i>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Quick Action Shortcuts & Today's Schedule */}
      <div className="row g-4">
        {/* Quick Actions Panel */}
        <div className="col-12 col-lg-4">
          <div className="card h-100 p-4 border shadow-sm">
            <h5 className="fw-bold text-dark mb-3 d-flex align-items-center gap-2">
              <i className="bi bi-lightning-charge-fill text-warning"></i> Quick Operations
            </h5>
            <p className="text-muted small mb-4">
              Access frequent administrative workflows with one click.
            </p>

            <div className="d-flex flex-column gap-2.5">
              <Link
                to="/appointments"
                className="btn btn-primary w-100 justify-content-between p-3 rounded-3"
              >
                <span className="d-flex align-items-center gap-2.5">
                  <i className="bi bi-calendar-plus fs-5"></i> Book Appointment
                </span>
                <i className="bi bi-chevron-right"></i>
              </Link>

              <Link
                to="/doctors"
                className="btn btn-outline-primary w-100 justify-content-between p-3 rounded-3"
              >
                <span className="d-flex align-items-center gap-2.5">
                  <i className="bi bi-person-plus-fill fs-5"></i> Register New Doctor
                </span>
                <i className="bi bi-chevron-right"></i>
              </Link>

              <Link
                to="/patients"
                className="btn btn-outline-primary w-100 justify-content-between p-3 rounded-3"
              >
                <span className="d-flex align-items-center gap-2.5">
                  <i className="bi bi-person-fill-add fs-5"></i> Register Patient
                </span>
                <i className="bi bi-chevron-right"></i>
              </Link>

              <Link
                to="/appointment-management"
                className="btn btn-outline-secondary w-100 justify-content-between p-3 rounded-3 text-dark"
                style={{ borderColor: "#cbd5e1" }}
              >
                <span className="d-flex align-items-center gap-2.5">
                  <i className="bi bi-table fs-5 text-primary"></i> View Master Roster
                </span>
                <i className="bi bi-chevron-right"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Today's Appointments Schedule Preview */}
        <div className="col-12 col-lg-8">
          <div className="card h-100 border shadow-sm p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="fw-bold text-dark mb-1 d-flex align-items-center gap-2">
                  <i className="bi bi-calendar-check text-primary"></i> Today's Scheduled Visits
                </h5>
                <p className="text-muted small mb-0">Appointments booked for today</p>
              </div>
              <Link to="/appointment-management" className="btn btn-sm btn-outline-primary rounded-pill">
                View All <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>

            {todayAppointments.length === 0 ? (
              <div className="empty-state-box py-5">
                <div className="empty-state-icon">
                  <i className="bi bi-calendar-x"></i>
                </div>
                <h6 className="fw-bold text-dark">No appointments scheduled for today</h6>
                <p className="text-muted small mb-3">All clear! Use the booking tool to schedule new patient visits.</p>
                <Link to="/appointments" className="btn btn-sm btn-primary">
                  <i className="bi bi-plus-circle me-1"></i> Book New Appointment
                </Link>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle custom-table">
                  <thead>
                    <tr>
                      <th>Time</th>
                      <th>Patient</th>
                      <th>Doctor</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayAppointments.slice(0, 5).map((apt) => (
                      <tr key={apt.id}>
                        <td>
                          <span className="badge bg-light text-dark border px-2 py-1.5 fw-semibold font-monospace">
                            <i className="bi bi-clock me-1 text-primary"></i>
                            {apt.appointmentTime}
                          </span>
                        </td>
                        <td>
                          <span className="fw-semibold text-dark">{apt.patient?.name || "Patient"}</span>
                        </td>
                        <td>
                          <span className="text-muted">Dr. {apt.doctor?.name || "Doctor"}</span>
                        </td>
                        <td>
                          <span
                            className={`status-badge ${
                              apt.status === "BOOKED"
                                ? "status-badge-booked"
                                : apt.status === "COMPLETED"
                                ? "status-badge-completed"
                                : "status-badge-cancelled"
                            }`}
                          >
                            <span className="status-dot"></span>
                            {apt.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;