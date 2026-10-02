import { useState } from "react";

function PatientForm({ onSubmit, onCancel }) {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    bloodGroup: "",
    disease: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !patient.name.trim() ||
      !patient.age ||
      !patient.gender ||
      !patient.phone.trim()
    ) {
      setErrorMessage("Please complete all mandatory patient fields (Name, Age, Gender, Phone).");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(patient);
      setPatient({
        name: "",
        age: "",
        gender: "",
        phone: "",
        address: "",
        bloodGroup: "",
        disease: "",
      });
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to register patient. Please check the network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card shadow-lg border-0 mb-5 overflow-hidden animate-fade-in">
      {/* Banner */}
      <div
        className="p-4 text-white d-flex align-items-center justify-content-between"
        style={{ background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)" }}
      >
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-3 bg-white bg-opacity-10 d-flex align-items-center justify-content-center text-white"
            style={{ width: "46px", height: "46px", fontSize: "1.3rem" }}
          >
            <i className="bi bi-person-fill-add"></i>
          </div>
          <div>
            <h4 className="fw-bold mb-0 text-white">Patient Intake & Registration</h4>
            <p className="text-white-50 small mb-0">
              Create a medical profile and clinical health record for hospital admissions.
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
            {/* Patient Name */}
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="patientName">
                <i className="bi bi-person text-teal" style={{ color: "#0d9488" }}></i> Full Name <span className="text-danger">*</span>
              </label>
              <div className="input-icon-group">
                <i className="bi bi-person"></i>
                <input
                  id="patientName"
                  className="form-control"
                  name="name"
                  value={patient.name}
                  placeholder="e.g. Emily Watson"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Age */}
            <div className="col-12 col-sm-6 col-md-3">
              <label className="form-label" htmlFor="patientAge">
                <i className="bi bi-calendar-event text-teal" style={{ color: "#0d9488" }}></i> Age <span className="text-danger">*</span>
              </label>
              <div className="input-icon-group">
                <i className="bi bi-calendar"></i>
                <input
                  id="patientAge"
                  type="number"
                  min="0"
                  max="125"
                  className="form-control"
                  name="age"
                  value={patient.age}
                  placeholder="e.g. 34"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Gender */}
            <div className="col-12 col-sm-6 col-md-3">
              <label className="form-label" htmlFor="patientGender">
                <i className="bi bi-gender-ambiguous text-teal" style={{ color: "#0d9488" }}></i> Gender <span className="text-danger">*</span>
              </label>
              <div className="input-icon-group">
                <i className="bi bi-person-bounding-box"></i>
                <select
                  id="patientGender"
                  className="form-select"
                  name="gender"
                  value={patient.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Blood Group */}
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="patientBlood">
                <i className="bi bi-droplet-fill text-danger"></i> Blood Group
              </label>
              <div className="input-icon-group">
                <i className="bi bi-droplet text-danger"></i>
                <select
                  id="patientBlood"
                  className="form-select"
                  name="bloodGroup"
                  value={patient.bloodGroup}
                  onChange={handleChange}
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phone */}
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="patientPhone">
                <i className="bi bi-telephone text-teal" style={{ color: "#0d9488" }}></i> Phone Number <span className="text-danger">*</span>
              </label>
              <div className="input-icon-group">
                <i className="bi bi-telephone"></i>
                <input
                  id="patientPhone"
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={patient.phone}
                  placeholder="e.g. +1 (555) 987-6543"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Disease / Chief Complaint */}
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="patientDisease">
                <i className="bi bi-clipboard2-pulse text-warning"></i> Primary Concern / Condition
              </label>
              <div className="input-icon-group">
                <i className="bi bi-heart-pulse"></i>
                <input
                  id="patientDisease"
                  className="form-control"
                  name="disease"
                  value={patient.disease}
                  placeholder="e.g. Hypertension, Diabetes, Routine Checkup"
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Address */}
            <div className="col-12 col-md-6">
              <label className="form-label" htmlFor="patientAddress">
                <i className="bi bi-geo-alt text-teal" style={{ color: "#0d9488" }}></i> Residential Address
              </label>
              <div className="input-icon-group">
                <i className="bi bi-geo-alt"></i>
                <input
                  id="patientAddress"
                  className="form-control"
                  name="address"
                  value={patient.address}
                  placeholder="e.g. 742 Evergreen Terrace, Springfield"
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
              className="btn btn-success px-4 shadow"
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
                  Register Patient
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PatientForm;