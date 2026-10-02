import { useState } from "react";

function DoctorForm({ onSubmit, onCancel }) {
  const [doctor, setDoctor] = useState({
    name: "",
    specialization: "",
    qualification: "",
    experience: "",
    phone: "",
    email: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const specializationsList = [
    "Cardiology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "General Medicine",
    "Dermatology",
    "Oncology",
    "Gastroenterology",
    "ENT & Head Surgery",
    "Psychiatry",
    "General Surgery",
    "Radiology",
  ];

  const handleChange = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !doctor.name.trim() ||
      !doctor.specialization.trim() ||
      !doctor.qualification.trim() ||
      !doctor.experience
    ) {
      setErrorMessage("Please complete all required fields (Name, Specialization, Qualification, Experience).");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(doctor);
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to register doctor. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card shadow-lg border-0 mb-5 overflow-hidden animate-fade-in">
      <div
        className="p-4 text-white d-flex align-items-center justify-content-between"
        style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}
      >
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-3 bg-white bg-opacity-10 d-flex align-items-center justify-content-center text-primary"
            style={{ width: "46px", height: "46px", fontSize: "1.3rem" }}
          >
            <i className="bi bi-person-plus-fill"></i>
          </div>
          <div>
            <h4 className="fw-bold mb-0 text-white">Register New Medical Specialist</h4>
            <p className="text-white-50 small mb-0">
              Add doctor profile to the hospital roster and appointment booking engine.
            </p>
          </div>
        </div>

        {onCancel && (
          <button
            type="button"
            className="btn btn-outline-light btn-sm rounded-pill"
            onClick={onCancel}
          >
            <i className="bi bi-x-lg me-1"></i> Close
          </button>
        )}
      </div>

      <div className="p-4 p-md-5">
        {errorMessage && (
          <div className="alert alert-danger alert-dismissible fade show rounded-3 mb-4" role="alert">
            <i className="bi bi-exclamation-octagon-fill me-2"></i>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row g-3 g-md-4">
            {/* Full Name */}
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="doctorName">
                <i className="bi bi-person text-primary"></i> Doctor's Full Name <span className="text-danger">*</span>
              </label>
              <div className="input-icon-group">
                <i className="bi bi-person"></i>
                <input
                  id="doctorName"
                  className="form-control"
                  name="name"
                  value={doctor.name}
                  placeholder="e.g. Dr. Robert Chen"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Specialization */}
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="doctorSpecialization">
                <i className="bi bi-heart-pulse text-primary"></i> Medical Specialization <span className="text-danger">*</span>
              </label>
              <div className="input-icon-group">
                <i className="bi bi-hospital"></i>
                <input
                  id="doctorSpecialization"
                  list="specializationOptions"
                  className="form-control"
                  name="specialization"
                  value={doctor.specialization}
                  placeholder="e.g. Cardiology or Neurology"
                  onChange={handleChange}
                  required
                />
                <datalist id="specializationOptions">
                  {specializationsList.map((spec) => (
                    <option key={spec} value={spec} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Qualification */}
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="doctorQualification">
                <i className="bi bi-mortarboard text-primary"></i> Academic Qualifications <span className="text-danger">*</span>
              </label>
              <div className="input-icon-group">
                <i className="bi bi-mortarboard"></i>
                <input
                  id="doctorQualification"
                  className="form-control"
                  name="qualification"
                  value={doctor.qualification}
                  placeholder="e.g. MBBS, MD, FRCS"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Experience */}
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="doctorExperience">
                <i className="bi bi-award text-primary"></i> Years of Experience <span className="text-danger">*</span>
              </label>
              <div className="input-icon-group">
                <i className="bi bi-award"></i>
                <input
                  id="doctorExperience"
                  type="number"
                  min="0"
                  max="60"
                  className="form-control"
                  name="experience"
                  value={doctor.experience}
                  placeholder="e.g. 12"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="doctorPhone">
                <i className="bi bi-telephone text-primary"></i> Contact Phone
              </label>
              <div className="input-icon-group">
                <i className="bi bi-telephone"></i>
                <input
                  id="doctorPhone"
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={doctor.phone}
                  placeholder="e.g. +1 (555) 234-5678"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="doctorEmail">
                <i className="bi bi-envelope text-primary"></i> Professional Email
              </label>
              <div className="input-icon-group">
                <i className="bi bi-envelope"></i>
                <input
                  id="doctorEmail"
                  type="email"
                  className="form-control"
                  name="email"
                  value={doctor.email}
                  placeholder="e.g. dr.chen@hospital.com"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-end gap-3 mt-4 pt-3 border-top">
            {onCancel && (
              <button
                type="button"
                className="btn btn-outline-secondary px-4"
                onClick={onCancel}
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="btn btn-primary px-4 shadow"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Registering...
                </>
              ) : (
                <>
                  <i className="bi bi-check2-circle fs-5"></i>
                  Complete Registration
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DoctorForm;
