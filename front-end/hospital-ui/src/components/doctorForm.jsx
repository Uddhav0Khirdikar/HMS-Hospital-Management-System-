    import { useState } from "react";
    function doctorForm({ onSubmit }) {
        const [doctor, setDoctor] = useState({
        name: "",
        specialization: "",
        qualification: "",
        experience: "",
        phone: "",
        email: ""
    });
    const handleChange = (e) => {
        setDoctor({
            ...doctor,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(doctor);
    };

    return (

        <div className="container mt-5">

        <h2 className="text-center mb-4">
            Doctor Registration
        </h2>


        <form onSubmit={handleSubmit}
        className="card p-4 shadow">


            <input
            className="form-control mb-3"
            name="name"
            value={doctor.name}
            placeholder="Doctor Name"
            onChange={handleChange}
            />

            <input
            className="form-control mb-3"
            name="phone"
            value={doctor.phone}
            placeholder="Phone"
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
            name="experience"
            value={doctor.experience}
            placeholder="Experience"
            onChange={handleChange}
            />
            <input
            className="form-control mb-3"
            name="email"
            value={doctor.email}
            placeholder="Email"
            onChange={handleChange}
            />
            <input
            className="form-control mb-3"
            name="qualification"
            value={doctor.qualification}
            placeholder="Qualification"
            onChange={handleChange}
            />



            <button className="btn btn-primary">
            Register Doctor
            </button>


        </form>

        </div>

    )

    }


    export default doctorForm;


