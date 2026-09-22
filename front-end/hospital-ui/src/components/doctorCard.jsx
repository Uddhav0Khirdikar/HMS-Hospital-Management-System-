import { useNavigate } from "react-router-dom";
import { deleteDoctor } from "../services/doctorServices";

function DoctorCard({ doctor }) {
    const navigate = useNavigate();

    const handleViewProfile = () => {
        navigate(`/doctors/${doctor.id}`);
    };
    const handleDelete = () => {

    if (!window.confirm("Are you sure you want to delete this doctor?")) {
        return;
    }

    deleteDoctor(doctor.id)
        .then(() => {
            alert("Doctor deleted successfully");
            window.location.reload();
        })
        .catch((error) => {
            console.log(error);
            alert("Cannot delete this doctor. They may have existing appointments.");
        });
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
                <button
                    className="btn btn-outline-warning ms-2"
                    onClick={() => navigate(`/doctors/edit/${doctor.id}`)}
                >
                    Edit
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

export default DoctorCard;