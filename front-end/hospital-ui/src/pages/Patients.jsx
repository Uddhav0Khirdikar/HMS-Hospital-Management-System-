import PatientForm from "../components/patientForm";
import { savePatient } from "../services/patientServices";

function patientPage() {

    const handlePatientSubmit = (patient) => {

        savePatient(patient)
            .then((response) => {
                console.log(response.data);
                alert("Patient Registered Successfully");
            })
            .catch((error) => {
                console.log(error);
                alert("Something went wrong");
            });

    };

    return (
        <PatientForm onSubmit={handlePatientSubmit} />
    );
}

export default patientPage;