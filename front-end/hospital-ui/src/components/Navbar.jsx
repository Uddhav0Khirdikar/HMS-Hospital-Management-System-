import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

            <div className="container">

                <Link className="navbar-brand" to="/">
                    Hospital Management
                </Link>

                <div className="navbar-nav">

                    <Link className="nav-link" to="/">
                        Dashboard
                    </Link>

                    <Link className="nav-link" to="/patients">
                        Patients
                    </Link>

                    <Link className="nav-link" to="/doctors">
                        Doctors
                    </Link>

                    <Link className="nav-link" to="/appointments">
                        Appointments
                    </Link>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;