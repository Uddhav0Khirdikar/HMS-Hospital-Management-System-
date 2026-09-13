import { useEffect, useState } from "react";
import { getPatients } from "../services/patientServices";
import { getDoctors } from "../services/doctorServices";

function AppointmentForm({ onSubmit }) {

    const [appointment, setAppointment] = useState({
        patientId: "",
        doctorId: "",
        appointmentDate: "",
        appointmentTime: "",
        status: "BOOKED"
    });

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    // Load Patients and Doctors when component loads
    useEffect(() => {

        loadPatients();
        loadDoctors();

    }, []);

    const loadPatients = () => {

        getPatients()
            .then((response) => {
                setPatients(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const loadDoctors = () => {

        getDoctors()
            .then((response) => {
                setDoctors(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const handleChange = (e) => {

        setAppointment({
            ...appointment,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit(appointment);

    };

    return (

        <div className="container mt-5">

            <h2 className="text-center mb-4">
                Book Appointment
            </h2>

            <form onSubmit={handleSubmit} className="card p-4 shadow">

                {/* Patient Dropdown */}
                <select
                    className="form-control mb-3"
                    name="patientId"
                    value={appointment.patientId}
                    onChange={handleChange}
                    required
                >

                    <option value="">Select Patient</option>

                    {patients.map((patient) => (

                        <option key={patient.id} value={patient.id}>
                            {patient.name}
                        </option>

                    ))}

                </select>

                {/* Doctor Dropdown */}
                <select
                    className="form-control mb-3"
                    name="doctorId"
                    value={appointment.doctorId}
                    onChange={handleChange}
                    required
                >

                    <option value="">Select Doctor</option>

                    {doctors.map((doctor) => (

                        <option key={doctor.id} value={doctor.id}>
                            {doctor.name}
                        </option>

                    ))}

                </select>

                {/* Appointment Date */}
                <input
                    type="date"
                    className="form-control mb-3"
                    name="appointmentDate"
                    value={appointment.appointmentDate}
                    onChange={handleChange}
                    required
                />

                {/* Appointment Time */}
                <input
                    type="time"
                    className="form-control mb-3"
                    name="appointmentTime"
                    value={appointment.appointmentTime}
                    onChange={handleChange}
                    required
                />

                {/* Status */}
                <select
                    className="form-control mb-3"
                    name="status"
                    value={appointment.status}
                    onChange={handleChange}
                >

                    <option value="BOOKED">BOOKED</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>

                </select>

                <button className="btn btn-primary">
                    Book Appointment
                </button>

            </form>

        </div>

    );

}

export default AppointmentForm;