import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">

                <Link className="navbar-brand fw-bold" to="/">
                    HMS
                </Link>

                <div className="navbar-nav">

                    <Link className="nav-link" to="/">
                        Home
                    </Link>

                    <Link className="nav-link" to="/doctors">
                        Doctors
                    </Link>

                    <Link className="nav-link" to="/patients">
                        Patients
                    </Link>

                    <Link className="nav-link" to="/appointments">
                        Appointments
                    </Link>

                    <button
                        className="btn btn-light ms-3"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;