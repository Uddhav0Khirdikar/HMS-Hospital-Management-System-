import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPatientById } from "../services/patientServices";

function PatientProfile() {

    const { id } = useParams();

    const [patient, setPatient] = useState(null);

    useEffect(() => {

        getPatientById(id)
            .then((response) => {
                setPatient(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [id]);

    if (!patient) {
        return (
            <div className="container py-5 text-center">
                <p>Loading patient...</p>
            </div>
        );
    }

    return (
        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <div className="card border-0 shadow-sm patient-profile-card">

                        <div className="card-body p-5">

                            <div className="text-center">

                                <div className="patient-profile-avatar">
                                    👤
                                </div>

                                <h1 className="mt-3">
                                    {patient.name}
                                </h1>

                                <p className="text-muted">
                                    Patient ID: {patient.id}
                                </p>

                            </div>

                            <hr className="my-4" />

                            <div className="row">

                                <div className="col-md-6 mb-4">
                                    <strong>Age</strong>
                                    <p>{patient.age}</p>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <strong>Gender</strong>
                                    <p>{patient.gender}</p>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <strong>Blood Group</strong>
                                    <p>{patient.bloodGroup}</p>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <strong>Phone</strong>
                                    <p>{patient.phone}</p>
                                </div>

                                <div className="col-md-12 mb-4">
                                    <strong>Disease</strong>
                                    <p>{patient.disease}</p>
                                </div>

                                <div className="col-md-12">
                                    <strong>Address</strong>
                                    <p>{patient.address}</p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default PatientProfile;