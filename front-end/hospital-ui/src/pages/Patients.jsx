import { useEffect, useState } from "react";
import { getPatients, savePatient, deletePatient } from "../services/patientServices";
import PatientCard from "../components/PatientCard";
import PatientForm from "../components/patientForm";
import { useNavigate } from "react-router-dom";

function Patients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [bloodFilter, setBloodFilter] = useState("ALL");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = () => {
    setLoading(true);
    getPatients()
      .then((response) => {
        setPatients(response.data || []);
      })
      .catch((error) => {
        console.error("Failed to load patients:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePatientSubmit = (patient) => {
    return savePatient(patient)
      .then((response) => {
        alert("Patient Registered Successfully");
        setPatients([...patients, response.data]);
        setShowForm(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to Register Patient");
        throw error;
      });
  };

  const handleDeleteSuccess = (deletedId) => {
    setPatients(patients.filter((p) => p.id !== deletedId));
  };

  const handleDeleteFromTable = (patient) => {
    if (!window.confirm(`Are you sure you want to delete patient ${patient.name}?`)) {
      return;
    }

    deletePatient(patient.id)
      .then(() => {
        alert("Patient deleted successfully");
        handleDeleteSuccess(patient.id);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to delete patient. They may have active appointments.");
      });
  };

  // Derive unique blood groups present in current records
  const bloodGroupsList = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Filtered patients
  const filteredPatients = patients.filter((patient) => {
    const matchesBlood =
      bloodFilter === "ALL" || patient.bloodGroup === bloodFilter;

    const query = searchTerm.toLowerCase();
    const matchesSearch =
      (patient.name || "").toLowerCase().includes(query) ||
      (patient.phone || "").toLowerCase().includes(query) ||
      (patient.disease || "").toLowerCase().includes(query) ||
      String(patient.id).includes(query);

    return matchesBlood && matchesSearch;
  });

  return (
    <div className="animate-fade-in">
      {/* Header Banner */}
      <div className="page-header-banner">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <div className="badge-pill-header">
                <i className="bi bi-people-fill"></i> Health Registry
              </div>
              <h1 className="h2 fw-bold text-dark mb-1">Patient Management</h1>
              <p className="text-muted mb-0">
                Register admissions, view clinical diagnoses, and manage patient medical records.
              </p>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                className={`btn ${showForm ? "btn-outline-danger" : "btn-primary"} px-4 shadow-sm`}
                onClick={() => setShowForm(!showForm)}
              >
                <i className={`bi ${showForm ? "bi-x-circle" : "bi-person-fill-add"} me-1`}></i>
                {showForm ? "Close Form" : "Register Patient"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-5">
        {/* Registration Form (Collapsible) */}
        {showForm && (
          <PatientForm
            onSubmit={handlePatientSubmit}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Toolbar: Search, Blood Group Filter, View Mode Switcher */}
        <div className="card p-3 border shadow-sm mb-4">
          <div className="row g-3 align-items-center justify-content-between">
            {/* Search Input */}
            <div className="col-12 col-md-5 col-lg-4">
              <div className="input-icon-group">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name, phone, condition, ID..."
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

            {/* Blood Group Filter */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <select
                className="form-select"
                value={bloodFilter}
                onChange={(e) => setBloodFilter(e.target.value)}
              >
                <option value="ALL">All Blood Groups ({patients.length})</option>
                {bloodGroupsList.map((bg) => (
                  <option key={bg} value={bg}>
                    Blood Group {bg}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle & Count Badge */}
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 d-flex align-items-center justify-content-end gap-2">
              <span className="text-muted small d-none d-lg-inline">
                Showing <strong>{filteredPatients.length}</strong> patients
              </span>
              <div className="btn-group" role="group" aria-label="View switcher">
                <button
                  type="button"
                  className={`btn btn-sm ${viewMode === "grid" ? "btn-primary" : "btn-light border"}`}
                  onClick={() => setViewMode("grid")}
                  title="Grid view"
                >
                  <i className="bi bi-grid-fill"></i>
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${viewMode === "table" ? "btn-primary" : "btn-light border"}`}
                  onClick={() => setViewMode("table")}
                  title="Table view"
                >
                  <i className="bi bi-list-ul"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Patients Display */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading patients...</span>
            </div>
            <p className="text-muted small mt-2">Loading medical records...</p>
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="card border shadow-sm p-5 text-center empty-state-box">
            <div className="empty-state-icon">
              <i className="bi bi-people"></i>
            </div>
            <h5 className="fw-bold text-dark">No patient records found</h5>
            <p className="text-muted small mb-3">
              Try adjusting your search query or blood group filter.
            </p>
            <button
              className="btn btn-outline-primary btn-sm mx-auto"
              onClick={() => {
                setSearchTerm("");
                setBloodFilter("ALL");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="row">
            {filteredPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                onDeleteSuccess={handleDeleteSuccess}
              />
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="custom-table-container">
            <div className="table-responsive">
              <table className="table table-hover align-middle custom-table">
                <thead>
                  <tr>
                    <th>Patient ID</th>
                    <th>Name</th>
                    <th>Demographics</th>
                    <th>Blood Group</th>
                    <th>Diagnosis / Concern</th>
                    <th>Contact Phone</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => {
                    const initials = (patient.name || "P")
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase();

                    return (
                      <tr key={patient.id}>
                        <td>
                          <span className="badge bg-light text-dark border font-monospace px-2 py-1">
                            #{patient.id}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2.5">
                            <div
                              className="avatar-circle avatar-teal"
                              style={{ width: "36px", height: "36px", fontSize: "0.85rem" }}
                            >
                              {initials}
                            </div>
                            <span className="fw-bold text-dark">{patient.name}</span>
                          </div>
                        </td>
                        <td>
                          <span className="text-muted small">
                            {patient.age} yrs • {patient.gender || "N/A"}
                          </span>
                        </td>
                        <td>
                          {patient.bloodGroup ? (
                            <span className="badge bg-danger bg-opacity-10 text-danger border border-danger-subtle fw-bold">
                              {patient.bloodGroup}
                            </span>
                          ) : (
                            <span className="text-muted small">N/A</span>
                          )}
                        </td>
                        <td>
                          <span className="text-dark small">
                            {patient.disease || "Routine checkup"}
                          </span>
                        </td>
                        <td>
                          <span className="small text-muted">
                            <i className="bi bi-telephone me-1 text-primary"></i>
                            {patient.phone || "N/A"}
                          </span>
                        </td>
                        <td className="text-end">
                          <div className="d-inline-flex gap-1.5">
                            <button
                              className="btn btn-sm btn-outline-primary px-2.5 py-1 rounded-3"
                              onClick={() => navigate(`/patients/${patient.id}`)}
                              title="View Patient Medical Profile"
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-primary px-2.5 py-1 rounded-3"
                              onClick={() => navigate(`/appointments`)}
                              title="Book Appointment"
                            >
                              <i className="bi bi-calendar-plus"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger px-2.5 py-1 rounded-3"
                              onClick={() => handleDeleteFromTable(patient)}
                              title="Delete Record"
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
        )}
      </div>
    </div>
  );
}

export default Patients;
