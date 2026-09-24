
import "./Home.css";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (

        <div>

            {/* ================= HERO SECTION ================= */}

            <section className="home-hero">

                <div className="container">

                    <div className="row align-items-center min-vh-75 py-5">

                        {/* Left Side */}
                        <div className="col-md-7">

                            <p className="text-primary fw-bold">
                                YOUR HEALTH, OUR PRIORITY
                            </p>

                            <h1 className="display-3 fw-bold">
                                Quality Healthcare
                                <br />
                                Made Simple
                            </h1>

                            <p className="lead text-muted mt-3">
                                Book appointments, connect with trusted doctors,
                                and manage your healthcare with ease.
                            </p>

                            <div className="mt-4">

                                <button
                                    className="btn btn-primary btn-lg me-3 px-4"
                                    onClick={() => navigate("/appointments")}
                                >
                                    Book Appointment
                                </button>

                                <button
                                    className="btn btn-outline-primary btn-lg me-3 px-4"
                                    onClick={() => navigate("/doctors")}
                                >
                                    Register or View Doctors
                                </button>

                                <button
                                    className="btn btn-outline-primary btn-lg me-3 px-4"
                                    onClick={() => navigate("/patients")}
                                >
                                    Register or View Patients
                                </button>

                                <button
                                    className="btn btn-outline-primary btn-lg px-4"
                                    onClick={() => navigate("/appointment-management")}
                                >
                                    Manage Appointments
                                </button>

                            </div>

                        </div>


                        {/* Right Side */}
                        <div className="col-md-5 text-center">

                            <div className="home-card p-5 rounded-4 shadow-sm">

                                <h2 className="text-primary">
                                    🏥
                                </h2>

                                <h3 className="mt-3">
                                    Modern Healthcare
                                </h3>

                                <p className="text-muted">
                                    Better care. Better management.
                                    Better experience.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= SERVICES SECTION ================= */}

            <section className="services-section py-5">

                <div className="container">

                    {/* Section Heading */}

                    <div className="text-center mb-5">

                        <p className="text-primary fw-bold">
                            OUR SERVICES
                        </p>

                        <h2 className="services-title">
                            Healthcare Made Easier
                        </h2>

                        <p className="text-muted">
                            Everything you need to manage your healthcare
                            in one place.
                        </p>

                    </div>


                    {/* Service Cards */}

                    <div className="row g-4">


                        {/* Doctor Consultation */}

                        <div className="col-12 col-md-6 col-lg-4">

                            <div className="service-card h-100 p-4 text-center">

                                <div className="service-icon">
                                    🩺
                                </div>

                                <h4 className="mt-3">
                                    Doctor Consultation
                                </h4>

                                <p className="text-muted">
                                    Connect with trusted doctors and
                                    get the right care for your needs.
                                </p>

                                <button
                                    className="btn btn-outline-primary mt-auto"
                                    onClick={() => navigate("/doctors")}
                                >
                                    View Doctors
                                </button>

                            </div>

                        </div>


                        {/* Appointment Booking */}

                        <div className="col-12 col-md-6 col-lg-4">

                            <div className="service-card h-100 p-4 text-center">

                                <div className="service-icon">
                                    📅
                                </div>

                                <h4 className="mt-3">
                                    Appointment Booking
                                </h4>

                                <p className="text-muted">
                                    Book and manage appointments
                                    quickly and conveniently.
                                </p>

                                <button
                                    className="btn btn-outline-primary mt-auto"
                                    onClick={() => navigate("/appointments")}
                                >
                                    Book Appointment
                                </button>

                            </div>

                        </div>


                        {/* Patient Care */}

                        <div className="col-12 col-md-6 col-lg-4">

                            <div className="service-card h-100 p-4 text-center">

                                <div className="service-icon">
                                    🏥
                                </div>

                                <h4 className="mt-3">
                                    Patient Care
                                </h4>

                                <p className="text-muted">
                                    Manage patient information, medical details,
                                    and healthcare records.
                                </p>

                                <button
                                    className="btn btn-outline-primary mt-auto"
                                    onClick={() => navigate("/patients")}
                                >
                                    View Patients
                                </button>

                            </div>

                        </div>


                    </div>

                </div>

            </section>


            {/* ================= WHY CHOOSE US ================= */}

            <section className="why-section py-5">

                <div className="container">

                    <div className="row align-items-center">

                        {/* Left */}

                        <div className="col-md-6">

                            <p className="text-primary fw-bold">
                                WHY CHOOSE US
                            </p>

                            <h2 className="why-title">
                                Healthcare You Can Trust
                            </h2>

                            <p className="text-muted mt-3">
                                Our hospital management system makes healthcare
                                simpler, faster, and more organized for patients
                                and healthcare professionals.
                            </p>

                        </div>


                        {/* Right */}

                        <div className="col-md-6">

                            <div className="why-item">

                                <span className="why-icon">
                                    ✓
                                </span>

                                <div>

                                    <h5>
                                        Trusted Doctors
                                    </h5>

                                    <p className="text-muted">
                                        Connect with experienced healthcare professionals.
                                    </p>

                                </div>

                            </div>


                            <div className="why-item">

                                <span className="why-icon">
                                    ✓
                                </span>

                                <div>

                                    <h5>
                                        Easy Appointments
                                    </h5>

                                    <p className="text-muted">
                                        Schedule and manage appointments with ease.
                                    </p>

                                </div>

                            </div>


                            <div className="why-item">

                                <span className="why-icon">
                                    ✓
                                </span>

                                <div>

                                    <h5>
                                        Organized Healthcare
                                    </h5>

                                    <p className="text-muted">
                                        Keep patient and appointment information organized.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= STATISTICS SECTION ================= */}

            <section className="stats-section py-5">

                <div className="container">

                    <div className="row text-center g-4">

                        <div className="col-md-3">

                            <div className="stat-item">

                                <h2>
                                    500+
                                </h2>

                                <p>
                                    Patients Served
                                </p>

                            </div>

                        </div>


                        <div className="col-md-3">

                            <div className="stat-item">

                                <h2>
                                    50+
                                </h2>

                                <p>
                                    Qualified Doctors
                                </p>

                            </div>

                        </div>


                        <div className="col-md-3">

                            <div className="stat-item">

                                <h2>
                                    1000+
                                </h2>

                                <p>
                                    Appointments
                                </p>

                            </div>

                        </div>


                        <div className="col-md-3">

                            <div className="stat-item">

                                <h2>
                                    24/7
                                </h2>

                                <p>
                                    Healthcare Support
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= CALL TO ACTION ================= */}

            <section className="cta-section py-5">

                <div className="container">

                    <div className="cta-card text-center">

                        <h2>
                            Ready to Take Control of Your Healthcare?
                        </h2>

                        <p>
                            Book an appointment with a trusted doctor
                            and experience simpler healthcare management.
                        </p>

                        <button
                            className="btn btn-primary btn-lg px-4"
                            onClick={() => navigate("/appointments")}
                        >
                            Book an Appointment
                        </button>

                    </div>

                </div>

            </section>


            <Footer />

        </div>

    );

}

export default Home;
