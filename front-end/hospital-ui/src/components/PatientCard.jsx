import { useNavigate } from "react-router-dom";
import { deletePatient } from "../services/patientServices";
function PatientCard({ patient }) {

const handleDelete = () => {

    if (!window.confirm("Are you sure you want to delete this patient?")) {
        return;
    }

    deletePatient(patient.id)
        .then(() => {
            alert("Patient Deleted Successfully");
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
            alert("Failed to Delete Patient");
        });
};

    const navigate = useNavigate();

    const handleViewProfile = () => {
        navigate(`/patients/${patient.id}`);
    };

    return (
        <div className="col-md-4 mb-4">

            <div className="patient-card card h-100 border-0 shadow-sm">

                <div className="card-body text-center">

                    <div className="patient-avatar mb-3">
                        👤
                    </div>

                    <h4>
                        {patient.name}
                    </h4>

                    <p className="text-muted">
                        Patient ID: {patient.id}
                    </p>

                    <button
                        className="btn btn-outline-primary"
                        onClick={handleViewProfile}
                    >
                        View Profile
                    </button>
                    <button
                        className="btn btn-outline-danger ms-2"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
}

export default PatientCard;