import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentList from "../components/AppointmentList";
import { getAllAppointments } from "../services/appointmentService";

function AppointmentManagement() {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {

        getAllAppointments()
            .then((response) => {
                setAppointments(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (

        <div className="container py-5">

            <div className="text-center mb-5">

                <p className="text-primary fw-bold">
                    APPOINTMENT MANAGEMENT
                </p>

                <h1>
                    All Appointments
                </h1>

                <p className="text-muted">
                    View and manage scheduled hospital appointments.
                </p>
                <div className="mt-4">

                <button
                    className="btn btn-primary me-2"
                    onClick={() => navigate("/appointments")}
                >
                    Book New Appointment
                </button>

                <button
                    className="btn btn-outline-primary"
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </button>

               </div>

            </div>

            <div className="card border-0 shadow-sm">

                <div className="card-body p-4">

                 <AppointmentList
                        appointments={appointments}
                        onAppointmentUpdated={() => {
                            getAllAppointments()
                                .then((response) => {
                                    setAppointments(response.data);
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }}
                />

                </div>

            </div>

        </div>

    );
}

export default AppointmentManagement;