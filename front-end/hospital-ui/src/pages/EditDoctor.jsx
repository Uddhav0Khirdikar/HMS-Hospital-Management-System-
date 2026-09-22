import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {getDoctorById,updateDoctor} from "../services/doctorServices";

function EditDoctor() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState({
        name: "",
        specialization: "",
        qualification: "",
        experience: ""
    });

    useEffect(() => {

        getDoctorById(id)
            .then((response) => {
                setDoctor(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [id]);

    const handleChange = (e) => {

        setDoctor({
            ...doctor,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log("UPDATE BUTTON CLICKED");
        console.log(doctor);
        
        updateDoctor(id, doctor)
            .then(() => {

                alert("Doctor updated successfully");

                navigate(`/doctors/${id}`);

            })
            .catch((error) => {

                console.log(error);

                alert("Failed to update doctor");

            });
    };

    return (
        <div className="container py-5">

            <h2 className="text-center mb-4">
                Edit Doctor
            </h2>

            <form
                onSubmit={handleSubmit}
                className="card p-4 shadow"
            >

                <input
                    className="form-control mb-3"
                    name="name"
                    value={doctor.name}
                    placeholder="Doctor Name"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="specialization"
                    value={doctor.specialization}
                    placeholder="Specialization"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="qualification"
                    value={doctor.qualification}
                    placeholder="Qualification"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    name="experience"
                    type="number"
                    value={doctor.experience}
                    placeholder="Experience"
                    onChange={handleChange}
                />

                <button className="btn btn-primary">
                    Update Doctor
                </button>

            </form>

        </div>
    );
}

export default EditDoctor;