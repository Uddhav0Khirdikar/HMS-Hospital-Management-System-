import AppointmentForm from "../components/AppointmentForm";
import { addAppointment } from "../services/appointmentService";
import { useSearchParams } from "react-router-dom";

function Appointment() {

    const [searchParams] = useSearchParams();

    const doctorId = searchParams.get("doctorId");

    const handleAppointmentSubmit = (appointment) => {

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

            <AppointmentForm
                onSubmit={handleAppointmentSubmit}
                selectedDoctorId={doctorId}
            />

        </div>

    );
}

export default Appointment;