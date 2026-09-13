import AppointmentForm from "../components/AppointmentForm";
import { addAppointment } from "../services/appointmentService";

function Appointment() {

    const handleAppointmentSubmit = (appointment) => {

        // Convert patientId & doctorId into objects
        const appointmentData = {
            patient: {
                id: appointment.patientId
            },
            doctor: {
                id: appointment.doctorId
            },
            appointmentDate: appointment.appointmentDate,
            appointmentTime: appointment.appointmentTime,
            status: appointment.status
        };

        addAppointment(appointmentData)
            .then((response) => {

                console.log(response.data);

                alert("Appointment Booked Successfully");

            })
            .catch((error) => {

                console.log(error);

                alert("Failed to Book Appointment");

            });

    };

    return (

        <div>

            <AppointmentForm onSubmit={handleAppointmentSubmit} />

        </div>

    );

}

export default Appointment;