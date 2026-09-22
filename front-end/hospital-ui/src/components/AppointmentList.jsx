import { updateAppointment } from "../services/appointmentService";
function AppointmentList({ appointments, onAppointmentUpdated }) {

    const handleComplete = (appointment) => {

        updateAppointment(appointment.id, {
            status: "COMPLETED"
        })
            .then(() => {
                alert("Appointment completed successfully");
                onAppointmentUpdated();
            })
            .catch((error) => {
                console.log(error);
                alert("Failed to complete appointment");
            });
    };

    const handleCancel = (appointment) => {

        updateAppointment(appointment.id, {
            status: "CANCELLED"
        })
            .then(() => {
                alert("Appointment cancelled successfully");
                onAppointmentUpdated();
            })
            .catch((error) => {
                console.log(error);
                alert("Failed to cancel appointment");
            });
    };

    return (
        <div className="table-responsive">

            <table className="table table-hover align-middle appointment-management-table">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patient</th>
                        <th>Doctor</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {appointments.map((appointment) => (

                        <tr key={appointment.id}>

                            {/* Appointment ID */}
                            <td>
                                #{appointment.id}
                            </td>


                            {/* Patient */}
                            <td>
                                {appointment.patient?.name || "N/A"}
                            </td>


                            {/* Doctor */}
                            <td>
                                {appointment.doctor
                                    ? `Dr. ${appointment.doctor.name}`
                                    : "N/A"}
                            </td>


                            {/* Date */}
                            <td>
                                {appointment.appointmentDate}
                            </td>


                            {/* Time */}
                            <td>
                                {appointment.appointmentTime}
                            </td>


                            {/* Status */}
                            <td>

                                <span
                                    className={`badge ${
                                        appointment.status === "BOOKED"
                                            ? "bg-primary"
                                            : appointment.status === "COMPLETED"
                                            ? "bg-success"
                                            : appointment.status === "CANCELLED"
                                            ? "bg-danger"
                                            : "bg-secondary"
                                    }`}
                                >
                                    {appointment.status}
                                </span>

                            </td>


                            {/* Actions */}
                            <td>

                                {appointment.status === "BOOKED" && (

                                    <div className="d-flex gap-2">

                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => handleComplete(appointment)}
                                        >
                                            Complete
                                        </button>

                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleCancel(appointment)}
                                        >
                                            Cancel
                                        </button>

                                    </div>

                                )}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default AppointmentList;
