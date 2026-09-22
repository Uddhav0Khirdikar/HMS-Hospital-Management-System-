import Patients from "./pages/Patients";
import Home from "./pages/home";
import Doctors from "./pages/Doctors";
import Appointment from "./pages/Appointment";
import DoctorProfile from "./pages/DoctorProfile";
import PatientProfile from "./pages/PatientProfile";
import AppointmentManagement from "./pages/AppointmentManagement";
import EditDoctor from "./pages/EditDoctor";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
function App() {

  return (
    <>

      <Navbar />
    <Routes>

      <Route path="/" element={ <ProtectedRoute> <Home /> </ProtectedRoute> } />

      <Route path="/doctors" element={ <ProtectedRoute> <Doctors /> </ProtectedRoute> } />

      <Route path="/doctors/:id" element={ <ProtectedRoute> <DoctorProfile /> </ProtectedRoute> } />

      <Route path="/appointments" element={ <ProtectedRoute> <Appointment /> </ProtectedRoute> } />

    <Route path="/patients" element={ <ProtectedRoute> <Patients /> </ProtectedRoute> } />
    
    <Route path="/patients/:id" element={ <ProtectedRoute> <PatientProfile /> </ProtectedRoute> } />

    <Route path="/doctors/edit/:id" element={ <ProtectedRoute> <EditDoctor /> </ProtectedRoute> } />

    <Route path="/login" element={<Login />} />

    <Route path="/appointment-management" element={ <ProtectedRoute> <AppointmentManagement /> </ProtectedRoute> } />

    </Routes>
    </>
  );
}
export default App; 