import { useEffect, useState } from "react";
import DoctorForm from "../components/doctorForm";
import DoctorCard from "../components/doctorCard";
import DoctorTable from "../components/doctorTable";
import { getDoctors, addDoctor } from "../services/doctorServices";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("ALL");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = () => {
    setLoading(true);
    getDoctors()
      .then((response) => {
        setDoctors(response.data || []);
      })
      .catch((error) => {
        console.error("Failed to fetch doctors:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDoctorSubmit = (doctor) => {
    return addDoctor(doctor)
      .then((response) => {
        alert("Doctor Registered Successfully");
        setDoctors([...doctors, response.data]);
        setShowForm(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to Register Doctor");
        throw error;
      });
  };

  const handleDeleteSuccess = (deletedId) => {
    setDoctors(doctors.filter((d) => d.id !== deletedId));
  };

  // Derive unique specializations for filter dropdown
  const uniqueSpecialties = Array.from(
    new Set(doctors.map((d) => d.specialization).filter(Boolean))
  );

  // Filtered doctors
  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpecialty =
      selectedSpecialty === "ALL" || doc.specialization === selectedSpecialty;

    const query = searchTerm.toLowerCase();
    const matchesSearch =
      (doc.name || "").toLowerCase().includes(query) ||
      (doc.specialization || "").toLowerCase().includes(query) ||
      (doc.qualification || "").toLowerCase().includes(query);

    return matchesSpecialty && matchesSearch;
  });

  return (
    <div className="animate-fade-in">
      {/* Header Banner */}
      <div className="page-header-banner">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <div className="badge-pill-header">
                <i className="bi bi-heart-pulse-fill"></i> Medical Directory
              </div>
              <h1 className="h2 fw-bold text-dark mb-1">Doctors & Medical Specialists</h1>
              <p className="text-muted mb-0">
                Browse our team of certified physicians, specialists, and clinical directors.
              </p>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                className={`btn ${showForm ? "btn-outline-danger" : "btn-primary"} px-4 shadow-sm`}
                onClick={() => setShowForm(!showForm)}
              >
                <i className={`bi ${showForm ? "bi-x-circle" : "bi-person-plus-fill"} me-1`}></i>
                {showForm ? "Close Form" : "Register Doctor"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-5">
        {/* Registration Form (Collapsible) */}
        {showForm && (
          <DoctorForm
            onSubmit={handleDoctorSubmit}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Toolbar: Search, Specialty Filter, and Grid/Table Switcher */}
        <div className="card p-3 border shadow-sm mb-4">
          <div className="row g-3 align-items-center justify-content-between">
            {/* Search Input */}
            <div className="col-12 col-md-5 col-lg-4">
              <div className="input-icon-group">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search doctor, specialty, degree..."
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

            {/* Specialty Filter Dropdown */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-3">
              <select
                className="form-select"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <option value="ALL">All Specialties ({doctors.length})</option>
                {uniqueSpecialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle & Count Badge */}
            <div className="col-12 col-sm-6 col-md-3 col-lg-3 d-flex align-items-center justify-content-end gap-2">
              <span className="text-muted small d-none d-lg-inline">
                Showing <strong>{filteredDoctors.length}</strong> doctors
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

        {/* Doctors Display */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading doctors...</span>
            </div>
            <p className="text-muted small mt-2">Loading medical staff...</p>
          </div>
        ) : filteredDoctors.length === 0 ? (
          <div className="card border shadow-sm p-5 text-center empty-state-box">
            <div className="empty-state-icon">
              <i className="bi bi-person-x"></i>
            </div>
            <h5 className="fw-bold text-dark">No doctors match your criteria</h5>
            <p className="text-muted small mb-3">
              Try adjusting your search terms or filter selection.
            </p>
            <button
              className="btn btn-outline-primary btn-sm mx-auto"
              onClick={() => {
                setSearchTerm("");
                setSelectedSpecialty("ALL");
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="row">
            {filteredDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onDeleteSuccess={handleDeleteSuccess}
              />
            ))}
          </div>
        ) : (
          <DoctorTable
            doctors={filteredDoctors}
            onDeleteSuccess={handleDeleteSuccess}
          />
        )}
      </div>
    </div>
  );
}

export default Doctors;
