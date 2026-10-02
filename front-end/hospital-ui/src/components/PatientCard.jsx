import { useNavigate } from "react-router-dom";
import { deletePatient } from "../services/patientServices";

function PatientCard({ patient, onDeleteSuccess }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!window.confirm(`Are you sure you want to delete patient record for ${patient.name}?`)) {
      return;
    }

    deletePatient(patient.id)
      .then(() => {
        alert("Patient Record Deleted Successfully");
        if (onDeleteSuccess) {
          onDeleteSuccess(patient.id);
        } else {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to delete patient. They may have scheduled appointments.");
      });
  };

  const initials = (patient.name || "P")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="card h-100 card-hoverable border shadow-sm p-4 d-flex flex-column text-start position-relative overflow-hidden">
        {/* Top Accent Bar */}
        <div
          className="position-absolute top-0 start-0 end-0"
          style={{
            height: "4px",
            background: "linear-gradient(90deg, #0d9488 0%, #10b981 100%)",
          }}
        ></div>

        <div className="d-flex align-items-start gap-3 mb-3 pt-1">
          {/* Patient Avatar Circle */}
          <div
            className="avatar-circle avatar-teal flex-shrink-0"
            style={{ width: "52px", height: "52px", fontSize: "1.15rem" }}
          >
            {initials}
          </div>

          <div className="flex-grow-1 overflow-hidden">
            <div className="d-flex align-items-center justify-content-between mb-1">
              <span className="badge bg-light text-dark border font-monospace px-2 py-0.5 small">
                #{patient.id}
              </span>
              {patient.bloodGroup && (
                <span className="badge bg-danger bg-opacity-10 text-danger border border-danger-subtle px-2 py-0.5 fw-bold">
                  <i className="bi bi-droplet-fill me-0.5"></i> {patient.bloodGroup}
                </span>
              )}
            </div>
            <h5 className="fw-bold text-dark mb-0 text-truncate" title={patient.name}>
              {patient.name}
            </h5>
            <small className="text-muted d-block">
              {patient.age} yrs • {patient.gender || "Patient"}
            </small>
          </div>
        </div>

        {/* Diagnosis & Condition */}
        <div className="bg-light p-2.5 rounded-3 mb-3 border">
          <div className="d-flex align-items-center gap-1.5 text-muted small">
            <i className="bi bi-heart-pulse-fill text-danger"></i>
            <span className="text-truncate">
              Condition: <strong className="text-dark">{patient.disease || "Routine / None"}</strong>
            </span>
          </div>
        </div>

        {/* Contact Snippets */}
        <div className="mb-4 small text-muted d-flex flex-column gap-2">
          {patient.phone && (
            <div className="d-flex align-items-center gap-2 text-truncate">
              <i className="bi bi-telephone text-primary"></i>
              <span>{patient.phone}</span>
            </div>
          )}
          {patient.address && (
            <div className="d-flex align-items-center gap-2 text-truncate">
              <i className="bi bi-geo-alt text-primary"></i>
              <span>{patient.address}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto pt-3.5 border-top d-flex flex-column gap-2.5">
          <div className="d-flex gap-2.5">
            <button
              className="btn btn-outline-primary btn-sm flex-grow-1 rounded-3"
              onClick={() => navigate(`/patients/${patient.id}`)}
            >
              <i className="bi bi-person-lines-fill me-1"></i> View Record
            </button>
            <button
              className="btn btn-primary btn-sm px-3 rounded-3"
              onClick={() => navigate(`/appointments`)}
              title="Schedule consultation for this patient"
            >
              <i className="bi bi-calendar-plus"></i>
            </button>
            <button
              className="btn btn-outline-danger btn-sm rounded-3 px-3"
              onClick={handleDelete}
              title="Delete patient record"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientCard;