import { useEffect, useState } from "react";
import { getDoctors } from "../services/doctorServices";
import DoctorCard from "../components/DoctorCard";

function Doctors() {

    const [doctors, setDoctors] = useState([]);

    useEffect(() => {

        getDoctors()
            .then((response) => {
                setDoctors(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

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