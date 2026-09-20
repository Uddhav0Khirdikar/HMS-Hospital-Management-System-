import { Routes, Route } from "react-router-dom";
import Patients from "./pages/Patients";
import Home from "./pages/home";
import Doctors from "./pages/Doctors";
import Appointment from "./pages/Appointment";
import DoctorProfile from "./pages/DoctorProfile";
import PatientProfile from "./pages/PatientProfile";
import AppointmentManagement from "./pages/AppointmentManagement";
function App() {

  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/doctors" element={<Doctors />} />

      <Route path="/doctors/:id" element={<DoctorProfile />} />

      <Route path="/appointments" element={<Appointment />} />

    <Route path="/patients" element={<Patients />} />
    
    <Route path="/patients/:id" element={<PatientProfile />} />

<Route
    path="/appointment-management"
    element={<AppointmentManagement />}
/>

    </Routes>
  );
}

export default App;