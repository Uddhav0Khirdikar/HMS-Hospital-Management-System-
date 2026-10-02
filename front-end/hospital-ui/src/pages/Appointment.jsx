import { useNavigate, useSearchParams } from "react-router-dom";
import AppointmentForm from "../components/appointmentForm";
import { addAppointment } from "../services/appointmentService";

function Appointment() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const doctorId = searchParams.get("doctorId");

  const handleAppointmentSubmit = (appointment) => {
    const appointmentData = {
      patient: {
        id: appointment.patientId,
      },
      doctor: {
        id: appointment.doctorId,
      },
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
      status: appointment.status,
    };

    return addAppointment(appointmentData);
  };

  return (
    <div className="animate-fade-in">
      {/* Header Banner */}
      <div className="page-header-banner">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <div className="badge-pill-header">
                <i className="bi bi-calendar2-check"></i> Outpatient Department
              </div>
              <h1 className="h2 fw-bold text-dark mb-1">Appointment Scheduling</h1>
              <p className="text-muted mb-0">
                Book in-person consultations with our healthcare practitioners.
              </p>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-primary"
                onClick={() => navigate("/appointment-management")}
              >
                <i className="bi bi-list-check me-1"></i> Manage Appointments
              </button>
            </div>
          </div>
        </div>
      </div>

      <AppointmentForm
        onSubmit={handleAppointmentSubmit}
        selectedDoctorId={doctorId}
      />
    </div>
  );
}

export default Appointment;
