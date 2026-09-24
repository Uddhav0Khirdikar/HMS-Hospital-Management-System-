import { useEffect, useState } from "react";
import { getPatients, savePatient } from "../services/patientServices";
import PatientCard from "../components/PatientCard";
import PatientForm from "../components/patientForm";

function Patients() {

    const [patients, setPatients] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const handlePatientSubmit = (patient) => {

        savePatient(patient)
            .then((response) => {

                console.log(response.data);

                alert("Patient Registered Successfully");

                setPatients([...patients, response.data]);

                setShowForm(false);

            })
            .catch((error) => {

                console.log(error);

                alert("Failed to Register Patient");

            });
    };

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

            <div className="text-center mb-4">

                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Close Registration" : "Register Patient"}
                </button>

            </div>

            {showForm && (
                <PatientForm onSubmit={handlePatientSubmit} />
            )}

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
