import { useEffect, useState } from "react";
import { getPatients } from "../services/patientServices";
import { getDoctors } from "../services/doctorServices";

function AppointmentForm({ onSubmit, selectedDoctorId }) {
  const [appointment, setAppointment] = useState({
    patientId: "",
    doctorId: selectedDoctorId || "",
    appointmentDate: "",
    appointmentTime: "",
    status: "BOOKED",
  });

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Today's date string in YYYY-MM-DD for min date attribute
  const todayString = new Date().toISOString().split("T")[0];

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedDoctorId) {
      setAppointment((prev) => ({
        ...prev,
        doctorId: selectedDoctorId,
      }));
    }
  }, [selectedDoctorId]);

  const loadInitialData = async () => {
    setLoadingData(true);
    try {
      const [patientsRes, doctorsRes] = await Promise.all([
        getPatients(),
        getDoctors(),
      ]);
      setPatients(patientsRes.data || []);
      setDoctors(doctorsRes.data || []);
    } catch (err) {
      console.error("Failed to load appointment form resources:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleChange = (e) => {
    setAppointment({
      ...appointment,
      [e.target.name]: e.target.value,
    });
    if (feedback) setFeedback(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !appointment.patientId ||
      !appointment.doctorId ||
      !appointment.appointmentDate ||
      !appointment.appointmentTime
    ) {
      setFeedback({
        type: "danger",
        message: "Please fill in all mandatory booking fields (patient, doctor, date, and time).",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(appointment);
      setFeedback({
        type: "success",
        message: "Appointment successfully scheduled! You can review it in Appointment Management.",
      });
      // Reset non-fixed fields
      setAppointment({
        patientId: "",
        doctorId: selectedDoctorId || "",
        appointmentDate: "",
        appointmentTime: "",
        status: "BOOKED",
      });
    } catch (err) {
      setFeedback({
        type: "danger",
        message: "An unexpected error occurred while booking. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Find selected objects for live summary preview
  const selectedPatientObj = patients.find((p) => String(p.id) === String(appointment.patientId));
  const selectedDoctorObj = doctors.find((d) => String(d.id) === String(appointment.doctorId));

  return (
    <div className="container py-4">
      {feedback && (
        <div
          className={`alert alert-${feedback.type} alert-dismissible fade show d-flex align-items-center gap-2 mb-4 rounded-3 shadow-sm`}
          role="alert"
        >
          <i
            className={`bi ${
              feedback.type === "success" ? "bi-check-circle-fill text-success" : "bi-exclamation-triangle-fill text-danger"
            } fs-5`}
          ></i>
          <div>{feedback.message}</div>
          <button
            type="button"
            className="btn-close"
            onClick={() => setFeedback(null)}
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="row g-4 justify-content-center">
        {/* Form Column */}
        <div className="col-12 col-lg-7">
          <div className="card shadow-sm border overflow-hidden">
            <div
              className="p-4 text-white"
              style={{ background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)" }}
            >
              <div className="d-flex align-items-center gap-3">
                <div
                  className="rounded-3 d-flex align-items-center justify-content-center bg-white bg-opacity-20 text-white"
                  style={{ width: "48px", height: "48px", fontSize: "1.4rem" }}
                >
                  <i className="bi bi-calendar2-plus"></i>
                </div>
                <div>
                  <h4 className="fw-bold mb-1 text-white">Book an Appointment</h4>
                  <p className="mb-0 text-white-50 small">
                    Schedule a consultation between a registered patient and specialist doctor.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 p-md-5">
              {/* Patient Selection */}
              <div className="mb-4">
                <label className="form-label" htmlFor="patientId">
                  <i className="bi bi-person text-primary"></i> Select Patient <span className="text-danger">*</span>
                </label>
                <div className="input-icon-group">
                  <i className="bi bi-people"></i>
                  <select
                    id="patientId"
                    className="form-select"
                    name="patientId"
                    value={appointment.patientId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Choose a Registered Patient --</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name} (ID: #{patient.id} | Blood: {patient.bloodGroup || "N/A"})
                      </option>
                    ))}
                  </select>
                </div>
                {patients.length === 0 && !loadingData && (
                  <small className="text-muted mt-1 d-block">
                    No patients registered yet. Please register a patient first.
                  </small>
                )}
              </div>

              {/* Doctor Selection */}
              <div className="mb-4">
                <label className="form-label" htmlFor="doctorId">
                  <i className="bi bi-person-badge text-primary"></i> Select Doctor <span className="text-danger">*</span>
                </label>
                <div className="input-icon-group">
                  <i className="bi bi-heart-pulse"></i>
                  <select
                    id="doctorId"
                    className="form-select"
                    name="doctorId"
                    value={appointment.doctorId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Choose a Consulting Doctor --</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        Dr. {doctor.name} — {doctor.specialization} ({doctor.experience || 0} yrs exp)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date & Time Row */}
              <div className="row g-3 mb-4">
                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="appointmentDate">
                    <i className="bi bi-calendar3 text-primary"></i> Consultation Date <span className="text-danger">*</span>
                  </label>
                  <div className="input-icon-group">
                    <i className="bi bi-calendar-event"></i>
                    <input
                      id="appointmentDate"
                      type="date"
                      className="form-control"
                      name="appointmentDate"
                      min={todayString}
                      value={appointment.appointmentDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label" htmlFor="appointmentTime">
                    <i className="bi bi-clock text-primary"></i> Preferred Time <span className="text-danger">*</span>
                  </label>
                  <div className="input-icon-group">
                    <i className="bi bi-alarm"></i>
                    <input
                      id="appointmentTime"
                      type="time"
                      className="form-control"
                      name="appointmentTime"
                      value={appointment.appointmentTime}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 py-3 shadow"
                  disabled={isSubmitting || loadingData}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Booking Appointment...</span>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check2-circle fs-5"></i>
                      <span>Confirm & Book Appointment</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Live Booking Summary Column */}
        <div className="col-12 col-lg-5">
          <div className="card shadow-sm border p-4 h-100 bg-white d-flex flex-column">
            <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom">
              <h5 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                <i className="bi bi-ticket-detailed text-primary"></i> Booking Summary
              </h5>
              <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-1.5 rounded-pill fw-semibold">
                Live Preview
              </span>
            </div>

            {/* Doctor Summary */}
            <div className="p-3 mb-3 rounded-3 bg-light border">
              <span className="text-muted small fw-semibold text-uppercase d-block mb-2">
                Consulting Physician
              </span>
              {selectedDoctorObj ? (
                <div className="d-flex align-items-center gap-3">
                  <div className="avatar-circle avatar-blue">
                    <i className="bi bi-person-fill"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0">Dr. {selectedDoctorObj.name}</h6>
                    <span className="badge bg-info bg-opacity-10 text-primary small">
                      {selectedDoctorObj.specialization}
                    </span>
                    <small className="text-muted d-block mt-0.5">
                      {selectedDoctorObj.qualification} • {selectedDoctorObj.experience} years exp
                    </small>
                  </div>
                </div>
              ) : (
                <p className="text-muted small mb-0 fst-italic">
                  <i className="bi bi-info-circle me-1"></i> No doctor selected yet
                </p>
              )}
            </div>

            {/* Patient Summary */}
            <div className="p-3 mb-3 rounded-3 bg-light border">
              <span className="text-muted small fw-semibold text-uppercase d-block mb-2">
                Patient Information
              </span>
              {selectedPatientObj ? (
                <div className="d-flex align-items-center gap-3">
                  <div className="avatar-circle avatar-teal">
                    <i className="bi bi-person"></i>
                  </div>
                  <div>
                    <h6 className="fw-bold text-dark mb-0">{selectedPatientObj.name}</h6>
                    <small className="text-muted d-block">
                      Age: {selectedPatientObj.age} | Gender: {selectedPatientObj.gender}
                    </small>
                    <small className="text-muted d-block">
                      Blood: <strong className="text-danger">{selectedPatientObj.bloodGroup || "N/A"}</strong>
                    </small>
                  </div>
                </div>
              ) : (
                <p className="text-muted small mb-0 fst-italic">
                  <i className="bi bi-info-circle me-1"></i> No patient selected yet
                </p>
              )}
            </div>

            {/* Schedule Slot */}
            <div className="p-3 mb-3 rounded-3 bg-light border">
              <span className="text-muted small fw-semibold text-uppercase d-block mb-2">
                Scheduled Slot
              </span>
              <div className="d-flex align-items-center gap-4">
                <div>
                  <small className="text-muted d-block">Date</small>
                  <strong className="text-dark">
                    {appointment.appointmentDate || "Not chosen"}
                  </strong>
                </div>
                <div className="border-start ps-4">
                  <small className="text-muted d-block">Time</small>
                  <strong className="text-dark">
                    {appointment.appointmentTime || "Not chosen"}
                  </strong>
                </div>
              </div>
            </div>

            {/* Hospital Advisory Note */}
            <div className="mt-auto pt-3 border-top">
              <div className="d-flex align-items-start gap-2.5 text-muted small">
                <i className="bi bi-shield-check text-success fs-5 flex-shrink-0"></i>
                <span>
                  All patient consultations adhere to hospital privacy regulations. Please ensure patient
                  arrives 15 minutes prior to the scheduled slot for registration check-in.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentForm;