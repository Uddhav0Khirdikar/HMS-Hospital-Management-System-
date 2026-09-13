import { useState } from "react";

function PatientForm({ onSubmit }) {

    const [patient, setPatient] = useState({
        name: "",
        age: "",
        gender: "",
        phone: "",
        address: "",
        bloodGroup: "",
        disease: ""
    });

    const handleChange = (e) => {
        setPatient({
            ...patient,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Send patient data to PatientPage
        onSubmit(patient);

        // Optional: Clear the form after successful submission
        setPatient({
            name: "",
            age: "",
            gender: "",
            phone: "",
            address: "",
            bloodGroup: "",
            disease: ""
        });
    };

    return (
        <div className="container mt-5">

            <h2 className="text-center mb-4">
                Patient Registration
            </h2>

            <form onSubmit={handleSubmit} className="card p-4 shadow">

                <input
                    className="form-control mb-3"
                    name="name"
                    value={patient.name}
                    placeholder="Patient Name"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="age"
                    type="number"
                    value={patient.age}
                    placeholder="Age"
                    onChange={handleChange}
                />

                <select
                    className="form-control mb-3"
                    name="gender"
                    value={patient.gender}
                    onChange={handleChange}
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <input
                    className="form-control mb-3"
                    name="phone"
                    value={patient.phone}
                    placeholder="Phone"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="address"
                    value={patient.address}
                    placeholder="Address"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="bloodGroup"
                    value={patient.bloodGroup}
                    placeholder="Blood Group"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="disease"
                    value={patient.disease}
                    placeholder="Disease"
                    onChange={handleChange}
                />

                <button className="btn btn-primary">
                    Register Patient
                </button>

            </form>

        </div>
    );
}

export default PatientForm;