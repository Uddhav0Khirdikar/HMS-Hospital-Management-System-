import { useEffect, useState } from "react";
import { getPatients } from "../services/patientServices";
import PatientCard from "../components/PatientCard";

function Patients() {

    const [patients, setPatients] = useState([]);

    useEffect(() => {

        getPatients()
            .then((response) => {
                setPatients(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (
        <div className="container py-5">

            <div className="text-center mb-5">

                <p className="text-primary fw-bold">
                    OUR PATIENTS
                </p>

                <h1>
                    Patient Management
                </h1>

                <p className="text-muted">
                    Manage patient information and healthcare records.
                </p>

            </div>

            <div className="row">

                {patients.map((patient) => (

                    <PatientCard
                        key={patient.id}
                        patient={patient}
                    />

                ))}

            </div>

        </div>
    );
}

export default Patients;