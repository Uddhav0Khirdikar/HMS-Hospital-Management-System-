import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoctorById } from "../services/doctorServices";

function DoctorProfile() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {

        getDoctorById(id)
            .then((response) => {
                setDoctor(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [id]);

    // ADD IT HERE
    if (!doctor) {
        return <p>Loading doctor...</p>;
    }

 return (
    <div className="container py-5">

        <div className="row justify-content-center">

            <div className="col-lg-8">

                <div className="doctor-profile-card card border-0 shadow-sm">

                    <div className="card-body p-5 text-center">

                        <div className="doctor-profile-avatar">
                            👨‍⚕️
                        </div>

                        <h1 className="mt-3">
                            Dr. {doctor.name}
                        </h1>

                        <h5 className="text-primary">
                            {doctor.specialization}
                        </h5>

                        <p className="text-muted">
                            {doctor.qualification}
                        </p>

                        <hr className="my-4" />

                        <div className="row text-start">

                            <div className="col-md-6 mb-3">
                                <strong>Experience</strong>
                                <p>{doctor.experience} years</p>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Email</strong>
                                <p>{doctor.email}</p>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Phone</strong>
                                <p>{doctor.phone}</p>
                            </div>

                            <div className="col-md-6 mb-3">
                                <strong>Specialization</strong>
                                <p>{doctor.specialization}</p>
                            </div>

                        </div>
                            <button
                                className="btn btn-primary px-4"
                                onClick={() => navigate(`/appointments?doctorId=${doctor.id}`)}
                                        >
                                Book an Appointment
                            </button>

                    </div>

                </div>

            </div>

        </div>

    </div>
  );
}

export default DoctorProfile;