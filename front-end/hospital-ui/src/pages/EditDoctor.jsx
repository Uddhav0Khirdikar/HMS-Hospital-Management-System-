import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getDoctorById, updateDoctor } from "../services/doctorServices";

function EditDoctor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [doctor, setDoctor] = useState({
    name: "",
    specialization: "",
    qualification: "",
    experience: "",
    phone: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    setLoading(true);
    getDoctorById(id)
      .then((response) => {
        setDoctor(response.data);
      })
      .catch((error) => {
        console.error("Failed to load doctor for edit:", error);
        setFeedback({
          type: "danger",
          message: "Failed to load doctor details.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value,
    });
    if (feedback) setFeedback(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!doctor.name.trim() || !doctor.specialization.trim() || !doctor.qualification.trim()) {
      setFeedback({
        type: "danger",
        message: "Please ensure Name, Specialization, and Qualifications are filled out.",
      });
      return;
    }

    setIsSaving(true);
    updateDoctor(id, doctor)
      .then(() => {
        alert("Doctor updated successfully");
        navigate(`/doctors/${id}`);
      })
      .catch((error) => {
        console.error(error);
        setFeedback({
          type: "danger",
          message: "Failed to update doctor profile. Please try again.",
        });
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading doctor...</span>
        </div>
        <p className="text-muted small mt-2">Loading doctor profile for editing...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-5">
      {/* Header Banner */}
      <div className="page-header-banner">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2 small">
              <li className="breadcrumb-item">
                <Link to="/doctors" className="text-decoration-none text-muted">
                  Doctors
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/doctors/${id}`} className="text-decoration-none text-muted">
                  Dr. {doctor.name || "Doctor"}
                </Link>
              </li>
              <li className="breadcrumb-item active text-primary fw-semibold" aria-current="page">
                Edit
              </li>
            </ol>
          </nav>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="badge-pill-header">
                <i className="bi bi-pencil-square"></i> Record Update
              </div>
              <h1 className="h2 fw-bold text-dark mb-0">Edit Doctor Details</h1>
            </div>
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate(`/doctors/${id}`)}
            >
              <i className="bi bi-arrow-left me-1"></i> Cancel & Return
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card border shadow-sm overflow-hidden">
              <div
                className="p-4 text-white"
                style={{ background: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)" }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="rounded-3 bg-white bg-opacity-20 d-flex align-items-center justify-content-center text-white"
                    style={{ width: "44px", height: "44px", fontSize: "1.2rem" }}
                  >
                    <i className="bi bi-person-gear"></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0 text-white">Update Doctor Credentials</h5>
                    <small className="text-white-50">Doctor Record ID: #{id}</small>
                  </div>
                </div>
              </div>

              <div className="p-4 p-md-5">
                {feedback && (
                  <div className={`alert alert-${feedback.type} rounded-3 mb-4`} role="alert">
                    {feedback.message}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3 g-md-4">
                    {/* Name */}
                    <div className="col-12 col-md-6">
                      <label className="form-label" htmlFor="editDocName">
                        <i className="bi bi-person text-primary"></i> Doctor Name <span className="text-danger">*</span>
                      </label>
                      <div className="input-icon-group">
                        <i className="bi bi-person"></i>
                        <input
                          id="editDocName"
                          className="form-control"
                          name="name"
                          value={doctor.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Specialization */}
                    <div className="col-12 col-md-6">
                      <label className="form-label" htmlFor="editDocSpec">
                        <i className="bi bi-heart-pulse text-primary"></i> Specialization <span className="text-danger">*</span>
                      </label>
                      <div className="input-icon-group">
                        <i className="bi bi-heart-pulse"></i>
                        <input
                          id="editDocSpec"
                          className="form-control"
                          name="specialization"
                          value={doctor.specialization}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Qualification */}
                    <div className="col-12 col-md-6">
                      <label className="form-label" htmlFor="editDocQual">
                        <i className="bi bi-mortarboard text-primary"></i> Qualification <span className="text-danger">*</span>
                      </label>
                      <div className="input-icon-group">
                        <i className="bi bi-mortarboard"></i>
                        <input
                          id="editDocQual"
                          className="form-control"
                          name="qualification"
                          value={doctor.qualification}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Experience */}
                    <div className="col-12 col-md-6">
                      <label className="form-label" htmlFor="editDocExp">
                        <i className="bi bi-award text-primary"></i> Experience (Years) <span className="text-danger">*</span>
                      </label>
                      <div className="input-icon-group">
                        <i className="bi bi-award"></i>
                        <input
                          id="editDocExp"
                          type="number"
                          min="0"
                          max="60"
                          className="form-control"
                          name="experience"
                          value={doctor.experience}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="col-12 col-md-6">
                      <label className="form-label" htmlFor="editDocPhone">
                        <i className="bi bi-telephone text-primary"></i> Phone Number
                      </label>
                      <div className="input-icon-group">
                        <i className="bi bi-telephone"></i>
                        <input
                          id="editDocPhone"
                          className="form-control"
                          name="phone"
                          value={doctor.phone || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-12 col-md-6">
                      <label className="form-label" htmlFor="editDocEmail">
                        <i className="bi bi-envelope text-primary"></i> Email Address
                      </label>
                      <div className="input-icon-group">
                        <i className="bi bi-envelope"></i>
                        <input
                          id="editDocEmail"
                          type="email"
                          className="form-control"
                          name="email"
                          value={doctor.email || ""}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4"
                      onClick={() => navigate(`/doctors/${id}`)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary px-4 shadow"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Saving Changes...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-lg fs-5"></i>
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditDoctor;