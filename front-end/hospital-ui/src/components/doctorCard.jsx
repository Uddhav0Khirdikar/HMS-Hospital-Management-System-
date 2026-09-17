import { useNavigate } from "react-router-dom";
function DoctorCard({ doctor }) {
    const navigate = useNavigate();

    const handleViewProfile = () => {
        navigate(`/doctors/${doctor.id}`);
    };

    return (
        <div className="col-md-4 mb-4">

            <div className="doctor-card card h-100">

                <div className="card-body text-center">

                    <div className="doctor-avatar mb-3">
                        👨‍⚕️
                    </div>

                    <h4 className="card-title">
                        Dr. {doctor.name}
                    </h4>

                    <p className="text-primary fw-bold">
                        {doctor.specialization}
                    </p>

                    <p className="text-muted">
                        {doctor.qualification}
                    </p>

                    <p>
                        <strong>{doctor.experience}</strong> years experience
                    </p>

                    <button
                         className="btn btn-outline-primary"
                         onClick={() => navigate(`/doctors/${doctor.id}`)}
                            >
                     View Profile
                </button>

                </div>

            </div>

        </div>
    );
}

export default DoctorCard;