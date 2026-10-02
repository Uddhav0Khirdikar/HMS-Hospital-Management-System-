import { useState } from "react";
import { updateAppointment } from "../services/appointmentService";

function AppointmentList({ appointments = [], onAppointmentUpdated }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const handleComplete = (appointment) => {
    if (!window.confirm(`Mark appointment #${appointment.id} as COMPLETED?`)) {
      return;
    }

    setActionLoadingId(appointment.id);
    updateAppointment(appointment.id, {
      status: "COMPLETED",
    })
      .then(() => {
        onAppointmentUpdated();
      })
      .catch((error) => {
        console.error("Failed to complete appointment:", error);
        alert("Failed to complete appointment.");
      })
      .finally(() => {
        setActionLoadingId(null);
      });
  };

  const handleCancel = (appointment) => {
    if (!window.confirm(`Are you sure you want to CANCEL appointment #${appointment.id}?`)) {
      return;
    }

    setActionLoadingId(appointment.id);
    updateAppointment(appointment.id, {
      status: "CANCELLED",
    })
      .then(() => {
        onAppointmentUpdated();
      })
      .catch((error) => {
        console.error("Failed to cancel appointment:", error);
        alert("Failed to cancel appointment.");
      })
      .finally(() => {
        setActionLoadingId(null);
      });
  };

  // Filter appointments based on status and search query
  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus =
      statusFilter === "ALL" ? true : apt.status === statusFilter;

    const patientName = apt.patient?.name || "";
    const doctorName = apt.doctor?.name || "";
    const query = searchTerm.toLowerCase();

    const matchesSearch =
      patientName.toLowerCase().includes(query) ||
      doctorName.toLowerCase().includes(query) ||
      String(apt.id).includes(query);

    return matchesStatus && matchesSearch;
  });

  const bookedCount = appointments.filter((a) => a.status === "BOOKED").length;
  const completedCount = appointments.filter((a) => a.status === "COMPLETED").length;
  const cancelledCount = appointments.filter((a) => a.status === "CANCELLED").length;

  return (
    <div>
      {/* Search and Filters Toolbar */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        {/* Filter Pills */}
        <div className="d-flex flex-wrap gap-2">
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3 ${
              statusFilter === "ALL" ? "btn-primary" : "btn-light text-secondary border"
            }`}
            onClick={() => setStatusFilter("ALL")}
          >
            All <span className="badge bg-white text-dark ms-1">{appointments.length}</span>
          </button>
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3 ${
              statusFilter === "BOOKED" ? "btn-primary" : "btn-light text-secondary border"
            }`}
            onClick={() => setStatusFilter("BOOKED")}
          >
            Booked <span className="badge bg-primary bg-opacity-25 ms-1">{bookedCount}</span>
          </button>
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3 ${
              statusFilter === "COMPLETED" ? "btn-success" : "btn-light text-secondary border"
            }`}
            onClick={() => setStatusFilter("COMPLETED")}
          >
            Completed <span className="badge bg-success bg-opacity-25 ms-1">{completedCount}</span>
          </button>
          <button
            type="button"
            className={`btn btn-sm rounded-pill px-3 ${
              statusFilter === "CANCELLED" ? "btn-danger" : "btn-light text-secondary border"
            }`}
            onClick={() => setStatusFilter("CANCELLED")}
          >
            Cancelled <span className="badge bg-danger bg-opacity-25 ms-1">{cancelledCount}</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="input-icon-group" style={{ maxWidth: "320px", width: "100%" }}>
          <i className="bi bi-search"></i>
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search patient, doctor, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className="btn btn-link btn-sm text-muted position-absolute end-0 me-2 text-decoration-none"
              onClick={() => setSearchTerm("")}
              style={{ zIndex: 5 }}
            >
              <i className="bi bi-x"></i>
            </button>
          )}
        </div>
      </div>

      {/* Table Container */}
      <div className="custom-table-container">
        <div className="table-responsive">
          <table className="table table-hover align-middle custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Schedule</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    <div className="empty-state-box">
                      <div className="empty-state-icon">
                        <i className="bi bi-calendar-x"></i>
                      </div>
                      <h6 className="fw-bold text-dark">No appointments found</h6>
                      <p className="text-muted small mb-0">
                        {searchTerm
                          ? `No matches found for "${searchTerm}". Try a different search term.`
                          : "No appointments exist in this status category."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((apt) => {
                  const isActing = actionLoadingId === apt.id;
                  const patientInitials = (apt.patient?.name || "P")
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase();

                  return (
                    <tr key={apt.id}>
                      {/* ID */}
                      <td>
                        <span className="badge bg-light text-dark border font-monospace px-2 py-1">
                          #{apt.id}
                        </span>
                      </td>

                      {/* Patient */}
                      <td>
                        <div className="d-flex align-items-center gap-2.5">
                          <div
                            className="avatar-circle avatar-blue"
                            style={{ width: "36px", height: "36px", fontSize: "0.85rem" }}
                          >
                            {patientInitials}
                          </div>
                          <div>
                            <span className="fw-bold text-dark d-block">
                              {apt.patient?.name || "Anonymous Patient"}
                            </span>
                            <small className="text-muted">
                              {apt.patient?.phone ? (
                                <>
                                  <i className="bi bi-telephone me-1"></i>
                                  {apt.patient.phone}
                                </>
                              ) : (
                                `Patient ID: #${apt.patient?.id || "N/A"}`
                              )}
                            </small>
                          </div>
                        </div>
                      </td>

                      {/* Doctor */}
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <i className="bi bi-person-badge text-primary fs-5"></i>
                          <div>
                            <span className="fw-semibold text-dark d-block">
                              {apt.doctor ? `Dr. ${apt.doctor.name}` : "Unassigned Doctor"}
                            </span>
                            {apt.doctor?.specialization && (
                              <span className="badge bg-light text-secondary border small">
                                {apt.doctor.specialization}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Schedule (Date & Time) */}
                      <td>
                        <div>
                          <div className="d-flex align-items-center gap-1.5 fw-semibold text-dark small">
                            <i className="bi bi-calendar3 text-primary"></i>
                            <span>{apt.appointmentDate}</span>
                          </div>
                          <div className="d-flex align-items-center gap-1.5 text-muted small mt-1">
                            <i className="bi bi-clock"></i>
                            <span>{apt.appointmentTime}</span>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
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

                      {/* Actions */}
                      <td className="text-end">
                        {apt.status === "BOOKED" ? (
                          <div className="d-inline-flex gap-2">
                            <button
                              className="btn btn-sm btn-success px-3 py-1.5 rounded-pill"
                              disabled={isActing}
                              onClick={() => handleComplete(apt)}
                              title="Mark appointment as attended/completed"
                            >
                              {isActing ? (
                                <span className="spinner-border spinner-border-sm" role="status"></span>
                              ) : (
                                <>
                                  <i className="bi bi-check-lg"></i>
                                  <span>Complete</span>
                                </>
                              )}
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger px-3 py-1.5 rounded-pill"
                              disabled={isActing}
                              onClick={() => handleCancel(apt)}
                              title="Cancel this appointment"
                            >
                              <i className="bi bi-x-lg"></i>
                              <span>Cancel</span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-muted small fst-italic">
                            <i className="bi bi-check2-all me-1"></i> Archived
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AppointmentList;
