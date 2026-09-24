import { useEffect, useState } from "react";
import DoctorForm from "../components/doctorForm";
import { getDoctors, addDoctor } from "../services/doctorServices";
import DoctorCard from "../components/DoctorCard";

function Doctors() {

    const [doctors, setDoctors] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {

        getDoctors()
            .then((response) => {
                setDoctors(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    const handleDoctorSubmit = (doctor) => {

        addDoctor(doctor)
            .then((response) => {

                alert("Doctor Registered Successfully");

                setDoctors([...doctors, response.data]);

                setShowForm(false);

            })
            .catch((error) => {

                console.log(error);

                alert("Failed to Register Doctor");

            });
    };

    return (

        <div className="container py-5">

            <div className="text-center mb-5">

                <p className="text-primary fw-bold">
                    OUR DOCTORS
                </p>

                <h1>
                    Find Your Doctor
                </h1>

                <p className="text-muted">
                    Meet our experienced healthcare professionals
                    and find the right doctor for your needs.
                </p>

            </div>

            <div className="text-center mb-4">

                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Close Registration" : "Register Doctor"}
                </button>

            </div>

            {showForm && (
                <DoctorForm onSubmit={handleDoctorSubmit} />
            )}

            <div className="row">

                {doctors.map((doctor) => (

                    <DoctorCard
                        key={doctor.id}
                        doctor={doctor}
                    />

                ))}

            </div>

        </div>
    );
}

export default Doctors;
