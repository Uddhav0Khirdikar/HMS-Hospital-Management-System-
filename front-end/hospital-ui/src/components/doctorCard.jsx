import { useNavigate } from "react-router-dom";
import { deleteDoctor } from "../services/doctorServices";

function DoctorCard({ doctor, onDeleteSuccess }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!window.confirm(`Are you sure you want to remove Dr. ${doctor.name} from the roster?`)) {
      return;
    }

    deleteDoctor(doctor.id)
      .then(() => {
        alert("Doctor removed successfully");
        if (onDeleteSuccess) {
          onDeleteSuccess(doctor.id);
        } else {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Cannot delete this doctor. They may have active scheduled appointments.");
      });
  };

  const initials = (doctor.name || "Dr")
    .replace(/^Dr\.?\s*/i, "")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="card h-100 card-hoverable border shadow-sm p-4 d-flex flex-column text-start position-relative overflow-hidden">
        {/* Top Accent Gradient Bar */}
        <div
          className="position-absolute top-0 start-0 end-0"
          style={{
            height: "4px",
            background: "linear-gradient(90deg, #0284c7 0%, #0d9488 100%)",
          }}
        ></div>

        <div className="d-flex align-items-start gap-3 mb-3 pt-1">
          {/* Doctor Avatar */}
          <div
            className="avatar-circle avatar-blue flex-shrink-0"
            style={{ width: "54px", height: "54px", fontSize: "1.2rem" }}
          >
            {initials || <i className="bi bi-heart-pulse"></i>}
          </div>

          <div className="flex-grow-1 overflow-hidden">
            <span className="badge bg-primary bg-opacity-10 text-primary small fw-semibold px-2.5 py-1 rounded-pill mb-1">
              {doctor.specialization || "General Specialist"}
            </span>
            <h5 className="fw-bold text-dark mb-0 text-truncate" title={`Dr. ${doctor.name}`}>
              Dr. {doctor.name}
            </h5>
            <small className="text-muted d-block text-truncate">
              {doctor.qualification || "Medical Practitioner"}
            </small>
          </div>
        </div>

        {/* Doctor Stats & Details */}
        <div className="bg-light p-2.5 rounded-3 mb-3 border">
          <div className="d-flex align-items-center justify-content-between text-muted small">
            <span className="d-flex align-items-center gap-1.5">
              <i className="bi bi-award-fill text-warning"></i>
              <strong className="text-dark">{doctor.experience || 0}</strong> yrs experience
            </span>
            <span className="badge bg-success bg-opacity-10 text-success fw-semibold">
              <i className="bi bi-check2-circle me-1"></i> Available
            </span>
          </div>
        </div>

        {/* Contact Snippets */}
        <div className="mb-4 small text-muted d-flex flex-column gap-2">
          {doctor.phone && (
            <div className="d-flex align-items-center gap-2 text-truncate">
              <i className="bi bi-telephone text-primary"></i>
              <span>{doctor.phone}</span>
            </div>
          )}
          {doctor.email && (
            <div className="d-flex align-items-center gap-2 text-truncate">
              <i className="bi bi-envelope text-primary"></i>
              <span>{doctor.email}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto pt-3.5 border-top d-flex flex-column gap-2.5">
          <div className="d-flex gap-2.5">
            <button
              className="btn btn-primary btn-sm flex-grow-1 rounded-3"
              onClick={() => navigate(`/appointments?doctorId=${doctor.id}`)}
            >
              <i className="bi bi-calendar-plus me-1"></i> Book Visit
            </button>
            <button
              className="btn btn-outline-primary btn-sm px-3 rounded-3"
              onClick={() => navigate(`/doctors/${doctor.id}`)}
              title="View full doctor profile"
            >
              <i className="bi bi-eye"></i>
            </button>
          </div>

          <div className="d-flex gap-2.5">
            <button
              className="btn btn-outline-warning btn-sm flex-grow-1 rounded-3"
              onClick={() => navigate(`/doctors/edit/${doctor.id}`)}
            >
              <i className="bi bi-pencil-square me-1"></i> Edit
            </button>
            <button
              className="btn btn-outline-danger btn-sm rounded-3 px-3"
              onClick={handleDelete}
              title="Remove doctor"
            >
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;