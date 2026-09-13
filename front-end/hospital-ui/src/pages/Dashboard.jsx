import { useEffect, useState } from "react";
import { getPatients } from "../services/patientServices";
import { getDoctors } from "../services/doctorServices";
import { getAllAppointments } from "../services/appointmentService";

function Dashboard() {
    const [patientCount, setPatientCount] = useState(0);
const [doctorCount, setDoctorCount] = useState(0);
const [appointmentCount, setAppointmentCount] = useState(0);
const [todayAppointmentCount, setTodayAppointmentCount] = useState(0);
useEffect(() => {
    loadDashboardData();
}, []);

const loadDashboardData = () => {

    getPatients()
        .then((response) => {
            setPatientCount(response.data.length);
        })
        .catch((error) => console.log(error));

    getDoctors()
        .then((response) => {
            setDoctorCount(response.data.length);
        })
        .catch((error) => console.log(error));

    getAllAppointments()
    .then((response) => {
        const appointments = response.data;

        setAppointmentCount(appointments.length);

        const today = new Date().toISOString().split("T")[0];

        const todayAppointments = appointments.filter(
            (appointment) => appointment.appointmentDate === today
        );

        setTodayAppointmentCount(todayAppointments.length);
    })
    .catch((error) => console.log(error));
};
    return (
        <div className="container mt-5">

            <h1 className="text-center mb-5">
                Hospital Management Dashboard
            </h1>

            <div className="row">

                {/* Patients Card */}
                <div className="col-md-3">
                    <div className="card text-center shadow p-3">
                        <h5>Total Patients</h5>
                        <h2>{patientCount}</h2>
                    </div>
                </div>

                {/* Doctors Card */}
                <div className="col-md-3">
                    <div className="card text-center shadow p-3">
                        <h5>Total Doctors</h5>
                        <h2>{doctorCount}</h2>
                    </div>
                </div>

                {/* Appointments Card */}
                <div className="col-md-3">
                    <div className="card text-center shadow p-3">
                        <h5>Total Appointments</h5>
                        <h2>{appointmentCount}</h2>
                    </div>
                </div>

                {/* Today's Appointments */}
                <div className="col-md-3">
                    <div className="card text-center shadow p-3">
                        <h5>Today's Appointments</h5>
                        <h2>{todayAppointmentCount}</h2>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Dashboard;