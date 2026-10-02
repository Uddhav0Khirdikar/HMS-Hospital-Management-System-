import { useNavigate } from "react-router-dom";
import { deleteDoctor } from "../services/doctorServices";

function DoctorTable({ doctors = [], onDeleteSuccess }) {
  const navigate = useNavigate();

  const handleDelete = (doctor) => {
    if (!window.confirm(`Are you sure you want to remove Dr. ${doctor.name}?`)) {
      return;
    }

    deleteDoctor(doctor.id)
      .then(() => {
        alert("Doctor deleted successfully");
        if (onDeleteSuccess) {
          onDeleteSuccess(doctor.id);
        } else {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Cannot delete this doctor. They may have existing appointments.");
      });
  };

  return (
    <div className="custom-table-container">
      <div className="table-responsive">
        <table className="table table-hover align-middle custom-table">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Specialization</th>
              <th>Qualifications</th>
              <th>Experience</th>
              <th>Contact</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => {
              const initials = (doctor.name || "Dr")
                .replace(/^Dr\.?\s*/i, "")
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();

              return (
                <tr key={doctor.id}>
                  {/* Doctor Info */}
                  <td>
                    <div className="d-flex align-items-center gap-2.5">
                      <div
                        className="avatar-circle avatar-blue"
                        style={{ width: "38px", height: "38px", fontSize: "0.85rem" }}
                      >
                        {initials}
                      </div>
                      <div>
                        <span className="fw-bold text-dark d-block">
                          Dr. {doctor.name}
                        </span>
                        <small className="text-muted">ID: #{doctor.id}</small>
                      </div>
                    </div>
                  </td>

                  {/* Specialization */}
                  <td>
                    <span className="badge bg-primary bg-opacity-10 text-primary px-2.5 py-1 rounded-pill fw-semibold">
                      {doctor.specialization || "General"}
                    </span>
                  </td>

                  {/* Qualification */}
                  <td>
                    <span className="text-dark small fw-semibold">
                      {doctor.qualification}
                    </span>
                  </td>

                  {/* Experience */}
                  <td>
                    <span className="badge bg-light text-dark border">
                      <i className="bi bi-award me-1 text-warning"></i>
                      {doctor.experience || 0} yrs
                    </span>
                  </td>

                  {/* Contact */}
                  <td>
                    <div className="small">
                      {doctor.phone && (
                        <div>
                          <i className="bi bi-telephone text-primary me-1"></i>
                          {doctor.phone}
                        </div>
                      )}
                      {doctor.email && (
                        <div className="text-muted">
                          <i className="bi bi-envelope me-1"></i>
                          {doctor.email}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="text-end">
                    <div className="d-inline-flex gap-1.5">
                      <button
                        className="btn btn-sm btn-primary px-2.5 py-1 rounded-3"
                        onClick={() => navigate(`/appointments?doctorId=${doctor.id}`)}
                        title="Book Appointment"
                      >
                        <i className="bi bi-calendar-plus"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-primary px-2.5 py-1 rounded-3"
                        onClick={() => navigate(`/doctors/${doctor.id}`)}
                        title="View Profile"
                      >
                        <i className="bi bi-eye"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-warning px-2.5 py-1 rounded-3"
                        onClick={() => navigate(`/doctors/edit/${doctor.id}`)}
                        title="Edit Doctor"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger px-2.5 py-1 rounded-3"
                        onClick={() => handleDelete(doctor)}
                        title="Delete Doctor"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DoctorTable;
