import { useNavigate } from "react-router-dom";

function PatientCard({ patient }) {

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

                </div>

            </div>

        </div>
    );
}

export default PatientCard;